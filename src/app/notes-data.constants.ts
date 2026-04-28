import { Note } from "./notes.model";

export const initialNotes: Note[] = [
  {
    id: crypto.randomUUID(),
    title: 'Learn Angular Signals',
    content: 'Understand signal, computed and effect in Angular 16+',
    isPinned: true,
    // createdAt: new Date('2026-01-01'),
    // updatedAt: new Date('2026-01-01')
  },
  {
    id: crypto.randomUUID(),
    title: 'Grocery List',
    content: 'Milk, Eggs, Bread, Fruits',
    isPinned: false,
    // createdAt: new Date('2026-02-10'),
    // updatedAt: new Date('2026-02-10')
  },
  {
    id: crypto.randomUUID(),
    title: 'Workout Plan',
    content: 'Chest on Monday, Back on Tuesday',
    isPinned: false,
    // createdAt: new Date('2026-03-05'),
    // updatedAt: new Date('2026-03-05')
  },
  {
    id: crypto.randomUUID(),
    title: 'Project Ideas',
    content: 'Build a notes app using Angular signals',
    isPinned: true,
    // createdAt: new Date('2026-03-20'),
    // updatedAt: new Date('2026-03-20')
  },
  {
    id: crypto.randomUUID(),
    title: 'Meeting Notes',
    content: 'Discuss Angular migration strategy',
    isPinned: false,
    // createdAt: new Date('2026-04-01'),
    // updatedAt: new Date('2026-04-01')
  },
  {
    id: crypto.randomUUID(),
    title: 'Books to Read',
    content: 'Clean Code, Atomic Habits',
    isPinned: false,
    // createdAt: new Date('2026-04-10'),
    // updatedAt: new Date('2026-04-10')
  }
];