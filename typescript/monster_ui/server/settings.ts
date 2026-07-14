import * as fs from 'fs';
import * as path from 'path';
import { paths } from './paths';
import { SidebarSelection } from '../src/components/MonsterSidebar';

export interface AppSettings {
  lastActiveSelection?: SidebarSelection;
}

export function getSettings(): AppSettings {
  const settingsPath = paths.settingsPath;
  if (!fs.existsSync(settingsPath)) {
    return {};
  }
  try {
    const raw = fs.readFileSync(settingsPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Settings] Failed to parse settings:', err);
    return {};
  }
}

export function saveSettings(settings: AppSettings): void {
  const settingsPath = paths.settingsPath;
  try {
    const parentDir = path.dirname(settingsPath);
    if (!fs.existsSync(parentDir)) {
      fs.mkdirSync(parentDir, { recursive: true });
    }
    fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2), 'utf8');
  } catch (err) {
    console.error('[Settings] Failed to save settings:', err);
  }
}
