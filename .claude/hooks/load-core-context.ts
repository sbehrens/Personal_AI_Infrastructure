#!/usr/bin/env bun

/**
 * load-core-context.ts
 *
 * Automatically loads your core identity skill context at session start by reading and injecting
 * the skill SKILL.md file contents directly into Claude's context as a system-reminder.
 *
 * Purpose:
 * - Read core identity SKILL.md file content (PAI or WORK)
 * - Output content as system-reminder for Claude to process
 * - Ensure complete context (identity, preferences, security) available at session start
 * - Bypass skill activation logic by directly injecting context
 *
 * Setup:
 * 1. Customize your ~/.claude/skills/WORK/SKILL.md (or PAI) with your identity context
 * 2. Add this hook to settings.json SessionStart hooks
 * 3. Ensure PAI_DIR environment variable is set (defaults to $HOME/.claude)
 * 4. Set CORE_SKILL environment variable to choose skill (defaults to WORK, falls back to PAI)
 *
 * How it works:
 * - Runs at the start of every Claude Code session
 * - Skips execution for subagent sessions (they don't need core context)
 * - Reads your core identity SKILL.md file
 * - Injects content as <system-reminder> which Claude processes automatically
 * - Gives your AI immediate access to your complete identity context
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

async function main() {
  try {
    // Check if this is a subagent session - if so, exit silently
    const claudeProjectDir = process.env.CLAUDE_PROJECT_DIR || '';
    const isSubagent = claudeProjectDir.includes('/.claude/agents/') ||
                      process.env.CLAUDE_AGENT_TYPE !== undefined;

    if (isSubagent) {
      // Subagent sessions don't need core context loading
      console.error('🤖 Subagent session - skipping core context loading');
      process.exit(0);
    }

    // Get PAI directory from environment or use default
    const paiDir = process.env.PAI_DIR || join(homedir(), '.claude');

    // Determine which core skill to load (WORK or PAI)
    // CORE_SKILL env var can be set to 'WORK' or 'PAI'
    const coreSkillName = process.env.CORE_SKILL || 'WORK';
    let skillPath = join(paiDir, `skills/${coreSkillName}/SKILL.md`);

    // If WORK doesn't exist, fallback to PAI
    if (!existsSync(skillPath)) {
      console.error(`⚠️  ${coreSkillName} skill not found, trying PAI...`);
      skillPath = join(paiDir, 'skills/PAI/SKILL.md');
    }

    // Verify skill file exists
    if (!existsSync(skillPath)) {
      console.error(`❌ Core identity skill not found at: ${skillPath}`);
      console.error(`💡 Create your WORK or PAI skill file or check PAI_DIR/CORE_SKILL environment variables`);
      process.exit(1);
    }

    console.error(`📚 Reading ${coreSkillName} core context from skill file...`);

    // Read the skill SKILL.md file content
    const skillContent = readFileSync(skillPath, 'utf-8');

    console.error(`✅ Read ${skillContent.length} characters from ${coreSkillName} SKILL.md`);

    // Output the skill content as a system-reminder
    // This will be injected into Claude's context at session start
    const message = `<system-reminder>
CORE IDENTITY CONTEXT (Auto-loaded at Session Start)

The following context has been loaded from ${skillPath}:

---
${skillContent}
---

This context is now active for this session. Follow all instructions, preferences, and guidelines contained above.
</system-reminder>`;

    // Write to stdout (will be captured by Claude Code)
    console.log(message);

    console.error(`✅ ${coreSkillName} context injected into session`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error in load-core-context hook:', error);
    process.exit(1);
  }
}

main();
