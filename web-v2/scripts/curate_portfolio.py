import json
from pathlib import Path
from PIL import Image
import os
import shutil

def center_crop(img, target_ratio):
    w, h = img.size
    img_ratio = w / h
    if img_ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        return img.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        return img.crop((0, top, w, top + new_h))

def process_image(src_path, dest_dir, base_name, ratios):
    img = Image.open(src_path)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    variants = {}
    
    # original-clean
    orig_path = dest_dir / f"{base_name}-original-clean.webp"
    img.save(orig_path, "WEBP", quality=90)
    variants["originalClean"] = f"/portfolio-media/curated/{dest_dir.name}/{orig_path.name}"
    
    for variant_name, ratio in ratios.items():
        if ratio is None: continue
        try:
            cropped = center_crop(img, ratio)
            
            # Resize logic for web optimization
            max_w = 2000 if variant_name in ["heroWide", "heroCinematic"] else 1200
            if variant_name == "thumbnail": max_w = 600
            
            if cropped.width > max_w:
                ratio_w = max_w / cropped.width
                cropped = cropped.resize((max_w, int(cropped.height * ratio_w)), Image.Resampling.LANCZOS)
                
            out_path = dest_dir / f"{base_name}-{variant_name}.webp"
            qual = 85 if variant_name != "thumbnail" else 75
            cropped.save(out_path, "WEBP", quality=qual)
            variants[variant_name] = f"/portfolio-media/curated/{dest_dir.name}/{out_path.name}"
        except Exception as e:
            print(f"Error creating {variant_name} for {base_name}: {e}")
            
    return variants

def main():
    base_dir = Path(os.getcwd())
    content_dir = base_dir / "src/content"
    media_dir = base_dir / "public/portfolio-media"
    extracted_dir = media_dir / "extracted"
    renders_dir = media_dir / "page-renders"
    curated_dir = media_dir / "curated"
    
    # Create output directories
    dirs = ["identity", "project-01", "project-02", "project-03", "project-04", 
            "project-05", "project-06", "project-07", "project-08", "project-09", 
            "project-10", "project-11", "project-12", "project-13", "project-14", 
            "project-15", "territories"]
    
    for d in dirs:
        (curated_dir / d).mkdir(parents=True, exist_ok=True)
        
    with open(content_dir / "portfolio-assets.json") as f:
        assets = json.load(f)
        
    featured_assets = []
    
    # Curated Asset Definitions (Page number, type hint, target dir, base name, ratios)
    # We will pick the largest matching asset from the extracted folder for that page, 
    # or the page render if no asset matches well.
    
    curation_rules = [
        # IDENTIDAD
        {"page": 1, "use_render": True, "dir": "identity", "name": "identity-relief-hero-wide", "ratios": {"heroWide": 16/9, "heroCinematic": 2.1/1}, "role": "identity", "type": "map"},
        {"page": 5, "use_render": True, "dir": "identity", "name": "identity-mexico-texture", "ratios": {"square": 1/1}, "role": "texture", "type": "map"},
        
        # PROYECTO 01 (CDMX)
        {"page": 10, "use_render": True, "dir": "project-01", "name": "project-01-map", "ratios": {"heroWide": 16/9, "thumbnail": 1/1, "portrait": 4/5}, "role": "hero-candidate", "type": "map"},
        
        # PROYECTOS VERACRUZ
        {"page": 11, "use_render": False, "dir": "territories", "name": "territory-veracruz-photo", "ratios": {"heroCinematic": 2.1/1, "portrait": 4/5}, "role": "territory-intro", "type": "photograph"},
        {"page": 12, "use_render": True, "dir": "project-02", "name": "project-02-carbon-map", "ratios": {"heroWide": 16/9, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        {"page": 13, "use_render": True, "dir": "project-04", "name": "project-04-soil-map", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        
        # PROYECTOS METZTITLÁN
        {"page": 14, "use_render": True, "dir": "project-05", "name": "project-05-geomorfones", "ratios": {"heroWide": 16/9, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        {"page": 15, "use_render": True, "dir": "project-07", "name": "project-07-slope", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "gallery", "type": "map"},
        
        # PROYECTOS AGUASCALIENTES
        {"page": 16, "use_render": False, "dir": "territories", "name": "territory-aguascalientes-photo", "ratios": {"heroCinematic": 2.1/1, "landscape": 3/2}, "role": "territory-intro", "type": "photograph"},
        {"page": 17, "use_render": True, "dir": "project-09", "name": "project-09-cluster-map", "ratios": {"heroWide": 16/9, "portrait": 4/5, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        {"page": 18, "use_render": True, "dir": "project-10", "name": "project-10-conservation", "ratios": {"heroWide": 16/9, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        {"page": 19, "use_render": True, "dir": "project-11", "name": "project-11-agriculture", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "gallery", "type": "map"},
        {"page": 20, "use_render": True, "dir": "project-12", "name": "project-12-degradation", "ratios": {"heroWide": 16/9, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        {"page": 20, "use_render": False, "dir": "project-13", "name": "project-13-photo", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "gallery", "type": "photograph"},
        
        # GRANULAR
        {"page": 22, "use_render": True, "dir": "project-14", "name": "project-14-water-texture", "ratios": {"heroCinematic": 2.1/1, "thumbnail": 1/1}, "role": "hero-candidate", "type": "texture"},
        {"page": 23, "use_render": True, "dir": "project-14", "name": "project-14-water-quality-map", "ratios": {"heroWide": 16/9, "thumbnail": 1/1}, "role": "gallery", "type": "map"},
        {"page": 36, "use_render": True, "dir": "project-14", "name": "project-14-cluster-map", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "gallery", "type": "map"},
        
        # URBAN CHALLENGE
        {"page": 41, "use_render": True, "dir": "project-15", "name": "project-15-ring-render", "ratios": {"heroWide": 16/9, "heroCinematic": 2.1/1, "thumbnail": 1/1}, "role": "hero-candidate", "type": "render"},
        {"page": 43, "use_render": False, "dir": "project-15", "name": "project-15-walkway-render", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "gallery", "type": "render"},
    ]
    
    # Agregaremos fallbacks automáticos para los proyectos que faltan en la regla de curaduría explícita
    projects_with_hero = set([c["dir"].split("-")[1] for c in curation_rules if c["dir"].startswith("project-")])
    for i in range(1, 16):
        pid = f"{i:02d}"
        if pid not in projects_with_hero and pid not in ["03", "06", "08"]: # Avoid double pages here unless needed
            curation_rules.append({
                "page": None, "pid": pid, "use_render": False, "dir": f"project-{pid}", 
                "name": f"project-{pid}-auto-hero", "ratios": {"heroWide": 16/9, "thumbnail": 1/1}, 
                "role": "hero-candidate", "type": "unclassified"
            })
            
    # Para los dobles (3,6,8) asignamos a sus páginas
    curation_rules.extend([
        {"page": 12, "use_render": True, "dir": "project-03", "name": "project-03-hero", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        {"page": 14, "use_render": True, "dir": "project-06", "name": "project-06-hero", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
        {"page": 15, "use_render": True, "dir": "project-08", "name": "project-08-hero", "ratios": {"landscape": 3/2, "thumbnail": 1/1}, "role": "hero-candidate", "type": "map"},
    ])

    for rule in curation_rules:
        page_num = rule.get("page")
        pid = rule.get("pid")
        
        src_path = None
        
        if rule.get("use_render") and page_num:
            src_path = renders_dir / f"page-{page_num:03d}.webp"
        else:
            # Find largest asset for this page or project
            candidates = []
            if page_num:
                candidates = [a for a in assets if page_num in a["sourcePages"]]
            elif pid:
                candidates = [a for a in assets if pid in a["projectIds"]]
                
            if candidates:
                # Sort by area
                candidates.sort(key=lambda x: x["width"] * x["height"], reverse=True)
                candidate = candidates[0]
                src_path = extracted_dir / Path(candidate["src"]).name
            elif page_num:
                src_path = renders_dir / f"page-{page_num:03d}.webp"
                
        if src_path and src_path.exists():
            print(f"Processing {rule['name']} from {src_path.name}")
            dest_dir = curated_dir / rule["dir"]
            variants = process_image(src_path, dest_dir, rule["name"], rule["ratios"])
            
            project_id = rule["dir"].split("-")[1] if rule["dir"].startswith("project-") else None
            
            featured_assets.append({
                "id": rule["name"],
                "projectId": project_id,
                "territory": None,
                "sourcePage": page_num,
                "sourceAssetIds": [],
                "role": rule["role"],
                "type": rule["type"],
                "variants": variants,
                "focalPoint": {"x": 0.5, "y": 0.5},
                "dominantColors": [],
                "contrast": "dark",
                "recommendedTextPosition": "left",
                "credit": "Elaboración propia",
                "warnings": []
            })
        else:
            print(f"Skipping {rule['name']}, source not found.")
            
    with open(content_dir / "featured-assets.json", "w", encoding="utf-8") as f:
        json.dump(featured_assets, f, indent=2, ensure_ascii=False)
        
    print(f"Curaduría completa. Generados {len(featured_assets)} recursos destacados.")

if __name__ == "__main__":
    main()
