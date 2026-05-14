# HeyDev Component Library Documentation

## Overview

This document outlines the refactored component architecture designed to eliminate duplication and facilitate backend integration.

## Directory Structure

```
src/
├── components/
│   ├── primitives/     # Reusable UI building blocks
│   ├── shared/         # Domain-specific components
│   └── *.tsx           # Legacy components (being migrated)
├── theme/
│   ├── colors.ts       # Centralized color palette
│   └── spacing.ts      # Spacing and sizing constants
├── constants/          # Configuration objects
│   ├── statusConfig.ts # Status-related mappings
│   └── levelConfig.ts  # Level/tier configurations
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── screens/            # Application screens
```

## Primitives Library

Primitive components are fundamental, reusable building blocks with minimal dependencies:

### Avatar
```tsx
<Avatar initials="AB" size="md" backgroundColor={colors.buttonBg} />
```
- **Sizes**: xs (28), sm (40), md (46), lg (68), xl (80)
- **Props**: initials, size, backgroundColor

### Button Components
```tsx
<PrimaryButton onPress={() => {}} disabled={false}>
  Action
</PrimaryButton>

<SecondaryButton onPress={() => {}}>
  Secondary
</SecondaryButton>

<IconButton icon="home" onPress={() => {}} size={24} />
```

### Badge Components
```tsx
<LevelBadge level="Pleno" />
<StatusBadge status="Em análise" />
```

### Card Components
```tsx
<Card>
  <CardHeader>
    <Avatar initials="A" size="sm" />
    <View>
      <Text>Title</Text>
    </View>
  </CardHeader>
  <CardSection withDivider>
    Content here
  </CardSection>
</Card>
```

### Input Components
```tsx
<TextInput
  value={value}
  onChangeText={setValue}
  placeholder="Enter text"
  error={error}
/>
```

### Other Primitives
- **Banner**: Info/warning/success boxes
- **Chip**: Tags and filter pills
- **EmptyState**: Icon + title + description layout
- **Divider**: Horizontal line separator

## Hooks

### useStatusConfig
Access status configurations and mappings:
```tsx
const { config, getStyle, getIcon, getLabel } = useStatusConfig();
const style = getStyle('Em análise');
```

### useLevelConfig
Access level configurations:
```tsx
const { colors, getColors, tiers } = useLevelConfig();
const levelColors = getColors('Pleno');
```

## Utilities

### formatUtils
```tsx
import { formatValue, formatDeadline, formatTime, formatDate } from '@/utils';

formatValue('5000')        // "R$ 5.000"
formatDeadline('7 dias')   // "7 dias"
formatTime('2 hours ago')  // "2 hours ago"
```

### notificationUtils
```tsx
const { icon, color } = getNotificationIcon('Novo candidato');
```

## Centralized Configuration

### Status Configuration
Located in `src/constants/statusConfig.ts`:
- Defines status → icon/color/background mappings
- Single source of truth for all status displays
- Used by StatusBadge component automatically

### Level Configuration
Located in `src/constants/levelConfig.ts`:
- Maps Júnior/Pleno/Sênior to colors
- Includes level descriptions
- Used by LevelBadge component automatically

## Theme

### Colors
Centralized in `src/theme/colors.ts`:
```tsx
import { colors } from '@/theme/colors';

colors.primary      // #38bdf8
colors.success      // #4ade80
colors.danger       // #f87171
colors.levels.junior    // { bg: '#1a3a2a', text: '#4ade80' }
colors.status.analyzing // { bg: '#2a2410', text: '#fbbf24', icon: '#fbbf24' }
```

### Spacing & Sizing
Defined in `src/theme/spacing.ts`:
```tsx
import { SPACING, RADIUS, SIZES } from '@/theme/spacing';

SPACING.xs   // 4
SPACING.md   // 12
SPACING.lg   // 16
RADIUS.md    // 12
SIZES.avatar.md // 46
```

## Migration Guide

### Before (Old Pattern)
```tsx
// Hardcoded colors and configs scattered
const levelColors = {
  'Júnior': { bg: '#1a3a2a', text: '#4ade80' }
};

<View style={{ backgroundColor: '#1e293b', padding: 16 }}>
  <Text>{service.level}</Text>
</View>
```

### After (New Pattern)
```tsx
// Centralized, composable, reusable
import { Card, LevelBadge } from '@/components/primitives';
import { colors, SPACING } from '@/theme';

<Card>
  <LevelBadge level={service.level} />
</Card>
```

## Backend Integration Ready

The new structure makes backend integration seamless:

1. **Type Safety**: Models in `src/types/models.ts` mirror API responses
2. **Data Flow**: Screens focus on fetching; components handle display
3. **Configuration**: Status/level configs can be fetched from backend without UI changes
4. **Forms**: Centralized validation hooks ready for API integration
5. **Utilities**: Formatting functions handle API response shapes

## Adding New Components

1. Create primitive in `src/components/primitives/`
2. Export from `src/components/primitives/index.ts`
3. Use in screens or shared components
4. Follow the naming and structure conventions

## Color Palette Reference

- **Primary**: #38bdf8 (Cyan)
- **Success**: #4ade80 (Green)
- **Warning**: #fbbf24 (Yellow)
- **Danger**: #f87171 (Red)
- **Accent**: #818cf8 (Purple)
- **Muted**: #94a3b8 (Gray)
- **Background**: #0f172a (Dark blue)
- **Card**: #1e293b (Lighter dark blue)
- **Text**: #e2e8f0 (Light gray)
- **Border**: #1e3a5f (Blue-gray)

## Common Patterns

### List with Empty State
```tsx
{items.length > 0 ? (
  items.map(item => <ItemCard key={item.id} {...item} />)
) : (
  <EmptyState
    icon="search"
    title="No items"
    description="Try another search."
  />
)}
```

### Card with Actions
```tsx
<Card>
  <Text>{title}</Text>
  <Divider />
  <View style={{ flexDirection: 'row', gap: SPACING.md }}>
    <PrimaryButton onPress={onAction}>Action</PrimaryButton>
    <SecondaryButton onPress={onCancel}>Cancel</SecondaryButton>
  </View>
</Card>
```

### Status Badge Display
```tsx
<StatusBadge status="Em análise" />
// Automatically handles: icon, color, background
```
