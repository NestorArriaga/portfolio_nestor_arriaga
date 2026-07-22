import fitz  # PyMuPDF
from PIL import Image
import hashlib
import os
import json
import argparse
from pathlib import Path
import io

def get_page_classification(page_num, img_rect=None, page_width=None):
    """
    Returns (section, [projectIds], territory, role) based on page rules.
    If dual project page, uses img_rect and page_width to classify horizontal position.
    """
    if 1 <= page_num <= 5:
        return "editorial", [], None, "unclassified"
    elif 6 <= page_num <= 8:
        return "index", [], None, "unclassified"
    elif page_num == 9:
        return "territory-intro", [], "Ciudad de México", "unclassified"
    elif page_num == 10:
        return "project", ["01"], "Ciudad de México", "unclassified"
    elif page_num == 11:
        return "territory-intro", [], "Veracruz", "unclassified"
    elif page_num == 12:
        return _handle_dual_page(img_rect, page_width, ["02", "03"], "Veracruz")
    elif page_num == 13:
        return "project", ["04"], "Veracruz", "unclassified"
    elif page_num == 14:
        return _handle_dual_page(img_rect, page_width, ["05", "06"], "Metztitlán")
    elif page_num == 15:
        return _handle_dual_page(img_rect, page_width, ["07", "08"], "Metztitlán")
    elif page_num == 16:
        return "territory-intro", [], "Aguascalientes", "unclassified"
    elif page_num == 17:
        return "project", ["09"], "Aguascalientes", "unclassified"
    elif page_num == 18:
        return "project", ["10"], "Aguascalientes", "unclassified"
    elif page_num == 19:
        return "project", ["11"], "Aguascalientes", "unclassified"
    elif page_num == 20:
        return _handle_dual_page(img_rect, page_width, ["12", "13"], "Aguascalientes")
    elif 21 <= page_num <= 40:
        return "project", ["14"], "Comarca Lagunera", "unclassified"
    elif 41 <= page_num <= 45:
        return "project", ["15"], "Mérida", "unclassified"
    elif 46 <= page_num <= 47:
        return "closing", [], None, "unclassified"
    return "unclassified", [], None, "unclassified"

def _handle_dual_page(img_rect, page_width, projects, territory):
    if not img_rect or not page_width:
        return "project", projects, territory, "shared"
    x0 = img_rect[0]
    x1 = img_rect[2]
    cx = (x0 + x1) / 2
    mid = page_width / 2

    if x1 < mid * 1.1:
        return "project", [projects[0]], territory, "unclassified"
    elif x0 > mid * 0.9:
        return "project", [projects[1]], territory, "unclassified"
    else:
        return "project", projects, territory, "shared"

def get_hash(image_bytes):
    return hashlib.sha256(image_bytes).hexdigest()

def extract_portfolio(pdf_path, base_out_dir):
    out_dir = Path(base_out_dir)
    dirs = {
        "previews": out_dir / "public/portfolio-media/page-previews",
        "renders": out_dir / "public/portfolio-media/page-renders",
        "extracted": out_dir / "public/portfolio-media/extracted",
        "audit": out_dir / "public/portfolio-media/audit",
        "content": out_dir / "src/content"
    }
    for d in dirs.values():
        d.mkdir(parents=True, exist_ok=True)

    report = {
        "pdf": str(pdf_path),
        "pageCount": 0,
        "processedPages": 0,
        "failedPages": [],
        "assetsFound": 0,
        "assetsSaved": 0,
        "duplicatesRemoved": 0,
        "warnings": [],
        "errors": []
    }
    
    pages_json = []
    assets_json = []
    
    seen_hashes = {} # hash -> asset_id
    asset_id_counter = {}

    try:
        doc = fitz.open(pdf_path)
    except Exception as e:
        print(f"Error opening PDF: {e}")
        return

    report["pageCount"] = len(doc)
    
    for page_idx in range(len(doc)):
        page = doc[page_idx]
        page_num = page_idx + 1
        page_width = page.rect.width
        
        # 1. Renders
        try:
            # Preview (approx 1000px)
            pix_preview = page.get_pixmap(matrix=fitz.Matrix(1000/page_width, 1000/page_width), alpha=False)
            preview_path = dirs["previews"] / f"page-{page_num:03d}.webp"
            Image.frombytes("RGB", [pix_preview.width, pix_preview.height], pix_preview.samples).save(preview_path, "WEBP", quality=80)
            
            # High-res Render (approx 2400px)
            pix_render = page.get_pixmap(matrix=fitz.Matrix(2400/page_width, 2400/page_width), alpha=False)
            render_path = dirs["renders"] / f"page-{page_num:03d}.webp"
            Image.frombytes("RGB", [pix_render.width, pix_render.height], pix_render.samples).save(render_path, "WEBP", quality=90)
        except Exception as e:
            report["errors"].append(f"Page {page_num} render failed: {e}")
            report["failedPages"].append(page_num)
            continue
            
        # 2. Text Extraction
        try:
            text = page.get_text("text")
        except Exception as e:
            text = ""
            report["warnings"].append(f"Page {page_num} text extraction failed: {e}")
            
        section, proj_ids, territory, _ = get_page_classification(page_num)
        
        page_info = {
            "pageNumber": page_num,
            "section": section,
            "projectIds": proj_ids,
            "territory": territory or "N/A",
            "title": f"Página {page_num}",
            "text": text.strip(),
            "wordCount": len(text.split()),
            "previewImage": f"/portfolio-media/page-previews/page-{page_num:03d}.webp",
            "renderImage": f"/portfolio-media/page-renders/page-{page_num:03d}.webp",
            "extractionWarnings": []
        }
        pages_json.append(page_info)
        
        # 3. Image Extraction
        try:
            image_list = page.get_images(full=True)
            report["assetsFound"] += len(image_list)
        except Exception as e:
            report["warnings"].append(f"Page {page_num} image list failed: {e}")
            image_list = []
            
        for img_info in image_list:
            xref = img_info[0]
            try:
                # Use PyMuPDF Pixmap for handling masks automatically
                base_pix = fitz.Pixmap(doc, xref)
                # If CMYK or unsupported, convert to RGB/RGBA
                if base_pix.colorspace and base_pix.colorspace.n >= 4:
                    pix = fitz.Pixmap(fitz.csRGB, base_pix)
                else:
                    pix = base_pix

                img_data = pix.tobytes("png")
                pil_img = Image.open(io.BytesIO(img_data))
                
                # Filter tiny images
                if pil_img.width < 80 or pil_img.height < 80:
                    continue

                img_hash = get_hash(img_data)
                rects = page.get_image_rects(xref)
                rect = rects[0] if rects else None
                
                img_section, img_projs, img_territory, role = get_page_classification(page_num, rect, page_width)

                if img_hash in seen_hashes:
                    report["duplicatesRemoved"] += 1
                    asset_ref = next(a for a in assets_json if a["id"] == seen_hashes[img_hash])
                    if page_num not in asset_ref["sourcePages"]:
                        asset_ref["sourcePages"].append(page_num)
                        # Add proj_ids if not present
                        for pid in img_projs:
                            if pid not in asset_ref["projectIds"]:
                                asset_ref["projectIds"].append(pid)
                    continue
                
                # Determine name
                prefix = f"p{page_num:03d}-{img_section}"
                if img_projs:
                    prefix += f"-project-{img_projs[0]}"
                prefix += "-asset"
                
                asset_id_counter[prefix] = asset_id_counter.get(prefix, 0) + 1
                asset_id = f"{prefix}-{asset_id_counter[prefix]:02d}"
                
                # Save webp
                asset_filename = f"{asset_id}.webp"
                asset_path = dirs["extracted"] / asset_filename
                pil_img.save(asset_path, "WEBP", quality=90)
                
                seen_hashes[img_hash] = asset_id
                report["assetsSaved"] += 1
                
                bounds = {"x": 0, "y": 0, "width": 0, "height": 0}
                if rect:
                    bounds = {
                        "x": round(rect.x0 / page_width * 100, 2),
                        "y": round(rect.y0 / page.rect.height * 100, 2),
                        "width": round(rect.width / page_width * 100, 2),
                        "height": round(rect.height / page.rect.height * 100, 2)
                    }

                assets_json.append({
                    "id": asset_id,
                    "sourcePage": page_num,
                    "sourcePages": [page_num],
                    "projectIds": img_projs,
                    "section": img_section,
                    "territory": img_territory or "N/A",
                    "type": "image",
                    "role": role,
                    "src": f"/portfolio-media/extracted/{asset_filename}",
                    "originalSrc": None,
                    "width": pil_img.width,
                    "height": pil_img.height,
                    "aspectRatio": round(pil_img.width / pil_img.height, 2) if pil_img.height else 0,
                    "pageBounds": bounds,
                    "sha256": img_hash,
                    "hasAlpha": pil_img.mode in ("RGBA", "LA"),
                    "confidence": 0.8 if rect else 0.5,
                    "warnings": []
                })
                
            except Exception as e:
                report["warnings"].append(f"Page {page_num} xref {xref} extract failed: {e}")
                
        report["processedPages"] += 1

    # Write JSONs
    with open(dirs["content"] / "portfolio-pages.json", "w", encoding="utf-8") as f:
        json.dump(pages_json, f, indent=2, ensure_ascii=False)
        
    with open(dirs["content"] / "portfolio-assets.json", "w", encoding="utf-8") as f:
        json.dump(assets_json, f, indent=2, ensure_ascii=False)
        
    # Project Definitions
    projects_def = [
        {"id": "01", "slug": "areas-verdes-miguel-hidalgo", "title": "Mapeo y Análisis de Áreas Verdes en la Alcaldía Miguel Hidalgo", "territory": "Ciudad de México", "pages": [10], "assetIds": [], "status": "assets-extracted"},
        {"id": "02", "slug": "captura-carbono-decozalapa", "title": "Mapeo de Captura de Carbono en la Cuenca de Decozalapa", "territory": "Veracruz", "pages": [12], "assetIds": [], "status": "assets-extracted"},
        {"id": "03", "slug": "zonas-optimas-limon-cafe", "title": "Análisis de Zonas Óptimas para Limón y Café", "territory": "Veracruz", "pages": [12], "assetIds": [], "status": "assets-extracted"},
        {"id": "04", "slug": "uso-optimo-suelo-limon-cafe", "title": "Análisis de Uso Óptimo de Suelo para Limón y Café", "territory": "Veracruz", "pages": [13], "assetIds": [], "status": "assets-extracted"},
        {"id": "05", "slug": "analisis-geomorfologico-metztitlan", "title": "Análisis Geomorfológico de la Reserva de la Biosfera en Metztitlán", "territory": "Metztitlán", "pages": [14], "assetIds": [], "status": "assets-extracted"},
        {"id": "06", "slug": "reclasificacion-uso-suelo-ecologicas", "title": "Reclasificación de Uso de Suelo y Vegetación", "territory": "Metztitlán", "pages": [14], "assetIds": [], "status": "assets-extracted"},
        {"id": "07", "slug": "calculo-pendiente-intervalos", "title": "Cálculo de Pendiente en Cuatro Intervalos", "territory": "Metztitlán", "pages": [15], "assetIds": [], "status": "assets-extracted"},
        {"id": "08", "slug": "patrones-geomorfologicos-geomorfones", "title": "Análisis de Patrones Geomorfológicos", "territory": "Metztitlán", "pages": [15], "assetIds": [], "status": "assets-extracted"},
        {"id": "09", "slug": "analisis-cluster-vocaciones", "title": "Análisis de Clúster para Vocaciones Productivas", "territory": "Aguascalientes", "pages": [17], "assetIds": [], "status": "assets-extracted"},
        {"id": "10", "slug": "mapa-aptitud-conservacion", "title": "Mapa de Aptitud para la Conservación", "territory": "Aguascalientes", "pages": [18], "assetIds": [], "status": "assets-extracted"},
        {"id": "11", "slug": "mapa-aptitud-agricola", "title": "Mapa de Aptitud Agrícola", "territory": "Aguascalientes", "pages": [19], "assetIds": [], "status": "assets-extracted"},
        {"id": "12", "slug": "degradacion-suelo-calvillo", "title": "Análisis de Degradación del Suelo en Calvillo", "territory": "Aguascalientes", "pages": [20], "assetIds": [], "status": "assets-extracted"},
        {"id": "13", "slug": "delimitacion-subcuencas-rios", "title": "Delimitación de Subcuencas e Identificación de Ríos", "territory": "Aguascalientes", "pages": [20], "assetIds": [], "status": "assets-extracted"},
        {"id": "14", "slug": "granular-comarca-lagunera", "title": "Tipologías rurales situadas: análisis territorial multiescalar en la Comarca Lagunera", "territory": "Comarca Lagunera", "pages": list(range(21, 41)), "assetIds": [], "status": "assets-extracted"},
        {"id": "15", "slug": "urban-challenge-sedatu-giz", "title": "Urban Challenge SEDATU × GIZ", "territory": "Mérida", "pages": list(range(41, 46)), "assetIds": [], "status": "assets-extracted"}
    ]
    
    with open(dirs["content"] / "portfolio-projects.json", "w", encoding="utf-8") as f:
        json.dump(projects_def, f, indent=2, ensure_ascii=False)
        
    with open(dirs["audit"] / "extraction-report.json", "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2, ensure_ascii=False)

    print(f"Extraction complete: {report['assetsSaved']} assets saved, {report['duplicatesRemoved']} duplicates removed.")
    print("Generating contact sheets...")
    
    # 5. Contact Sheet (Global)
    try:
        preview_files = sorted(dirs["previews"].glob("*.webp"))
        if preview_files:
            thumbs = [Image.open(p) for p in preview_files]
            cols = 8
            rows = (len(thumbs) + cols - 1) // cols
            w, h = 200, int(200 * (thumbs[0].height / thumbs[0].width))
            contact_sheet = Image.new("RGB", (cols * w, rows * h), (5,5,5))
            for i, img in enumerate(thumbs):
                img.thumbnail((w, h))
                x = (i % cols) * w
                y = (i // cols) * h
                contact_sheet.paste(img, (x, y))
            contact_sheet.save(dirs["audit"] / "contact-sheet.webp", "WEBP", quality=85)
            print("Global contact sheet generated.")
    except Exception as e:
        print(f"Contact sheet failed: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--pdf", default="../Portafolio_pliego.pdf", help="Path to PDF")
    args = parser.parse_args()
    
    pdf_path = Path(args.pdf).resolve()
    base_dir = Path(os.getcwd())
    
    extract_portfolio(pdf_path, base_dir)
