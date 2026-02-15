# HeyDev Mobile (Expo + React Native + TypeScript)

Projeto totalmente convertido do web app para um app mobile com Expo.

## Stack

- Expo SDK 53
- React Native 0.79
- TypeScript
- React Navigation (stack + tabs)

## Como rodar

```bash
npm install
npm run start
```

Atalhos:

- `npm run android`
- `npm run ios`
- `npm run web`
- `npm run typecheck`

## Rotas e telas migradas

### Stack principal
- Onboarding
- Login
- Main (tabs)
- ServiceDetails
- ServiceRequestSuccess
- Chat
- Candidates

### Tabs (Main)
- Feed
- Applications
- MyServices
- CreateService (apenas usuário empresa)
- Profile

## Estrutura

- `App.tsx`: bootstrap do app e estado de tipo de usuário
- `src/navigation/AppNavigator.tsx`: rotas stack/tab
- `src/screens/*`: telas convertidas do web app para mobile
- `src/components/ServiceCard.tsx`: card reutilizável de serviço
- `src/data/mockData.ts`: dados mockados para fluxo completo

## Compatibilidade de merge

Para reduzir conflitos com branches antigos, os arquivos legados da versão web foram mantidos no repositório em `src/app/*` (não usados no runtime Expo).

