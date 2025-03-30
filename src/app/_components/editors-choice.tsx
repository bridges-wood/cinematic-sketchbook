import { Star } from 'lucide-react';

export function EditorsChoice() {
  return (
    <div className="absolute -right-6 -top-6 rounded-lg bg-white p-4 shadow-lg">
      <div className="flex items-center gap-2">
        <Star className="h-5 w-5 text-yellow-500" />
        <span className="font-bold">Editor's Choice</span>
      </div>
    </div>
  );
}
