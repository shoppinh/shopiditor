# Workflow State & Rules (STM + Rules + Log)

*This file contains the dynamic state, embedded rules, active plan, and log for the current session.*
*It is read and updated frequently by the AI during its operational loop.*

---

## State

*Holds the current status of the workflow.*

```yaml
Phase: BLUEPRINT # Current workflow phase (ANALYZE, BLUEPRINT, CONSTRUCT, VALIDATE, BLUEPRINT_REVISE)
Status: NEEDS_PLAN_APPROVAL # Current status (READY, IN_PROGRESS, BLOCKED_*, NEEDS_*, COMPLETED)
CurrentTaskID: REACT_SETUP # Identifier for the main task being worked on
CurrentStep: null # Identifier for the specific step in the plan being executed
```

---

## Plan

*Contains the step-by-step implementation plan generated during the BLUEPRINT phase.*

*Task: Set up the initial React project structure for Shopiditor code editor*

`[ ] Step 1: Create base React application using Create React App` 
   - Use npx create-react-app to initialize a new React application
   - Name the application "shopiditor" (shop + editor)
   - Use JavaScript as the initial language (potential upgrade to TypeScript later)

`[ ] Step 2: Clean up default CRA boilerplate`
   - Remove unnecessary files (logo, test files, etc.)
   - Create a minimal, clean starting point

`[ ] Step 3: Set up project directory structure`
   - Create src/components/ directory for React components
   - Create src/hooks/ directory for custom React hooks
   - Create src/utils/ directory for utility functions
   - Create src/services/ directory for API service functions
   - Create src/styles/ directory for CSS/SCSS files
   - Create src/constants/ directory for constant values

`[ ] Step 4: Install required external libraries`
   - Install React Router for navigation
   - Install codemirror library for the code editor component
   - Install axios for API requests (future use with backend)
   - Install UI library (Tailwind CSS) for styling

`[ ] Step 5: Create basic application skeleton`
   - Create basic App component structure
   - Set up initial routing configuration

`[ ] Step 6: Set up CodeMirror integration`
   - Create a CodeEditor component that integrates CodeMirror
   - Set up basic language mode support for JavaScript and C#
   - Add basic editor configuration and theming

`[ ] Step 7: Create language selector component`
   - Create a dropdown component for selecting programming language
   - Support initial languages (JavaScript, C#)

`[ ] Step 8: Create execution button and output display`
   - Add a "Run" button component
   - Create an output display component for showing execution results
   - Add placeholder for future API integration

`[ ] Step 9: Implement basic styling`
   - Configure Tailwind CSS
   - Create responsive layout for editor and output areas
   - Apply consistent styling across components

`[ ] Step 10: Add README.md with setup instructions`
   - Document the project structure and setup steps
   - Include information about the project's purpose and features
   - Add development workflow instructions

---

## Rules

*Embedded rules governing the AI's autonomous operation.*

**# --- Core Workflow Rules ---**

RULE_WF_PHASE_ANALYZE:
  **Constraint:** Goal is understanding request/context. NO solutioning or implementation planning.

RULE_WF_PHASE_BLUEPRINT:
  **Constraint:** Goal is creating a detailed, unambiguous step-by-step plan. NO code implementation.

RULE_WF_PHASE_CONSTRUCT:
  **Constraint:** Goal is executing the `## Plan` exactly. NO deviation. If issues arise, trigger error handling or revert phase.

RULE_WF_PHASE_VALIDATE:
  **Constraint:** Goal is verifying implementation against `## Plan` and requirements using tools. NO new implementation.

RULE_WF_TRANSITION_01:
  **Trigger:** Explicit user command (`@analyze`, `@blueprint`, `@construct`, `@validate`).
  **Action:** Update `State.Phase` accordingly. Log phase change.

RULE_WF_TRANSITION_02:
  **Trigger:** AI determines current phase constraint prevents fulfilling user request OR error handling dictates phase change (e.g., RULE_ERR_HANDLE_TEST_01).
  **Action:** Log the reason. Update `State.Phase` (e.g., to `BLUEPRINT_REVISE`). Set `State.Status` appropriately (e.g., `NEEDS_PLAN_APPROVAL`). Report to user.

**# --- Initialization & Resumption Rules ---**

RULE_INIT_01:
  **Trigger:** AI session/task starts AND `workflow_state.md` is missing or empty.
  **Action:**
    1. Create `workflow_state.md` with default structure.
    2. Read `project_config.md` (prompt user if missing).
    3. Set `State.Phase = ANALYZE`, `State.Status = READY`.
    4. Log "Initialized new session."
    5. Prompt user for the first task.

RULE_INIT_02:
  **Trigger:** AI session/task starts AND `workflow_state.md` exists.
  **Action:**
    1. Read `project_config.md`.
    2. Read existing `workflow_state.md`.
    3. Log "Resumed session."
    4. Check `State.Status`: Handle READY, COMPLETED, BLOCKED_*, NEEDS_*, IN_PROGRESS appropriately (prompt user or report status).

RULE_INIT_03:
  **Trigger:** User confirms continuation via RULE_INIT_02 (for IN_PROGRESS state).
  **Action:** Proceed with the next action based on loaded state and rules.

**# --- Memory Management Rules ---**

RULE_MEM_READ_LTM_01:
  **Trigger:** Start of a new major task or phase.
  **Action:** Read `project_config.md`. Log action.

RULE_MEM_READ_STM_01:
  **Trigger:** Before *every* decision/action cycle.
  **Action:** Read `workflow_state.md`.

RULE_MEM_UPDATE_STM_01:
  **Trigger:** After *every* significant action or information receipt.
  **Action:** Immediately update relevant sections (`## State`, `## Plan`, `## Log`) in `workflow_state.md` and save.

RULE_MEM_UPDATE_LTM_01:
  **Trigger:** User command (`@config/update`) OR end of successful VALIDATE phase for significant change.
  **Action:** Propose concise updates to `project_config.md` based on `## Log`/diffs. Set `State.Status = NEEDS_LTM_APPROVAL`. Await user confirmation.

RULE_MEM_VALIDATE_01:
  **Trigger:** After updating `workflow_state.md` or `project_config.md`.
  **Action:** Perform internal consistency check. If issues found, log and set `State.Status = NEEDS_CLARIFICATION`.

**# --- Tool Integration Rules (Cursor Environment) ---**

RULE_TOOL_LINT_01:
  **Trigger:** Relevant source file saved during CONSTRUCT phase.
  **Action:** Instruct Cursor terminal to run lint command. Log attempt. On completion, parse output, log result, set `State.Status = BLOCKED_LINT` if errors.

RULE_TOOL_FORMAT_01:
  **Trigger:** Relevant source file saved during CONSTRUCT phase.
  **Action:** Instruct Cursor to apply formatter or run format command via terminal. Log attempt.

RULE_TOOL_TEST_RUN_01:
  **Trigger:** Command `@validate` or entering VALIDATE phase.
  **Action:** Instruct Cursor terminal to run test suite. Log attempt. On completion, parse output, log result, set `State.Status = BLOCKED_TEST` if failures, `TESTS_PASSED` if success.

RULE_TOOL_APPLY_CODE_01:
  **Trigger:** AI determines code change needed per `## Plan` during CONSTRUCT phase.
  **Action:** Generate modification. Instruct Cursor to apply it. Log action.

**# --- Error Handling & Recovery Rules ---**

RULE_ERR_HANDLE_LINT_01:
  **Trigger:** `State.Status` is `BLOCKED_LINT`.
  **Action:** Analyze error in `## Log`. Attempt auto-fix if simple/confident. Apply fix via RULE_TOOL_APPLY_CODE_01. Re-run lint via RULE_TOOL_LINT_01. If success, reset `State.Status`. If fail/complex, set `State.Status = BLOCKED_LINT_UNRESOLVED`, report to user.

RULE_ERR_HANDLE_TEST_01:
  **Trigger:** `State.Status` is `BLOCKED_TEST`.
  **Action:** Analyze failure in `## Log`. Attempt auto-fix if simple/localized/confident. Apply fix via RULE_TOOL_APPLY_CODE_01. Re-run failed test(s) or suite via RULE_TOOL_TEST_RUN_01. If success, reset `State.Status`. If fail/complex, set `State.Phase = BLUEPRINT_REVISE`, `State.Status = NEEDS_PLAN_APPROVAL`, propose revised `## Plan` based on failure analysis, report to user.

RULE_ERR_HANDLE_GENERAL_01:
  **Trigger:** Unexpected error or ambiguity.
  **Action:** Log error/situation to `## Log`. Set `State.Status = BLOCKED_UNKNOWN`. Report to user, request instructions.

---

## Log

*A chronological log of significant actions, events, tool outputs, and decisions.*
*(This section will be populated by the AI during operation)*

*Example:*
*   `[2025-03-26 17:55:00] Initialized new session.`
*   `[2025-03-26 17:55:15] User task: Implement login feature.`
*   `[2025-03-26 17:55:20] State.Phase changed to ANALYZE.`
*   `[2025-03-26 17:56:00] Read project_config.md.`
*   ...

*Actual Log:*
*   `[2025-03-26 17:53:47] Initialized new session. State set to ANALYZE/READY.`
*   `[2023-04-08 10:15:00] User requested to set up the initial React project structure.`
*   `[2023-04-08 10:15:10] State.Phase changed to BLUEPRINT. Status set to IN_PROGRESS. CurrentTaskID set to REACT_SETUP.`
*   `[2023-04-08 10:15:15] Creating detailed implementation plan for React project setup.`
*   `[2023-04-08 10:17:30] Created 10-step implementation plan for React project setup.`
*   `[2023-04-08 10:17:35] Status updated to NEEDS_PLAN_APPROVAL. Awaiting user confirmation before proceeding.`
