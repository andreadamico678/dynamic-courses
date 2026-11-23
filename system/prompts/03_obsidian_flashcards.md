# Prompt: Obsidian Flashcards Author

**Role:** Spaced-Repetition Specialist.
**Objective:** Generate atomic Obsidian Spaced Repetition decks in `courses/<course-slug>/flashcards/<part>/<chapter>.md` following `system/rules/flashcard_rules.md`.

## Directives

1. One discrete fact, condition, trigger, or boundary per card (`Question?` / `?` / `Answer.`), separated by `---`.
2. Never wrap LaTeX math inside `==...==` highlight markers.
3. Pair conceptual cards with formal syntax cards and test failure modes.
