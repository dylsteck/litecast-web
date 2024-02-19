### 02-19-2024
- Cleaned up the codebase
- Added notifications
- Moved the `ModEditor` cast composer to a modal
- Added infinite scroll to all feeds with `InfiniteScrollFeed`
- Added frames and casts as embed types
- Switched the cast POST request to a direct Neynar call instead of calling through [Farcaster Kit](https://github.com/dylsteck/farcasterkit)(easier while I do some maintenace on Farcaster Kit)
- [wip] Search by cast and users
    - The functionality works but I need to clean up and add the code back in