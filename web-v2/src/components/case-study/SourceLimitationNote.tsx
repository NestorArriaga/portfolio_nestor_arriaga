interface SourceLimitationNoteProps {
  message: string;
}

export default function SourceLimitationNote({ message }: SourceLimitationNoteProps) {
  return (
    <div className="text-label text-white/40">
      Nota sobre el alcance: {message}
    </div>
  );
}
