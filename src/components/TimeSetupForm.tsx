import { useState } from "react";

interface TimeSetupFormProps {
  onStart: (start: Date, end: Date) => void;
}

const TimeSetupForm = ({ onStart }: TimeSetupFormProps) => {
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!startDateTime || !endDateTime) {
      setError("Please fill in both start and end times.");
      return;
    }

    const start = new Date(startDateTime);
    const end = new Date(endDateTime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      setError("Invalid date/time format.");
      return;
    }

    if (end <= start) {
      setError("End time must be after start time.");
      return;
    }

    onStart(start, end);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6 animate-fade-in-up">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Hackathon Start Time
        </label>
        <input
          type="datetime-local"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Hackathon End Time
        </label>
        <input
          type="datetime-local"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
        />
      </div>

      {error && (
        <p className="text-destructive text-sm text-center">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity text-lg"
      >
        Start Countdown 🚀
      </button>
    </form>
  );
};

export default TimeSetupForm;
