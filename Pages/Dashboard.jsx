import { useState } from 'react';

/* ─── mock data ─── */
const currentUser = (() => {
  try {
    const u = JSON.parse(localStorage.getItem('user'));
    return u || { name: 'User', username: 'user', email: '' };
  } catch { return { name: 'User', username: 'user', email: '' }; }
})();

const STORIES = [
  { id: 0, username: 'Your story', avatar: `https://ui-avatars.com/api/?name=${currentUser.name}&background=0D8ABC&color=fff&size=150`, isOwn: true },
  { id: 1, username: 'alex.dev', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 2, username: 'sara_k', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 3, username: 'mike.travels', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 4, username: 'priya_photo', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 5, username: 'james.fit', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 6, username: 'luna.art', avatar: 'https://i.pravatar.cc/150?img=16' },
  { id: 7, username: 'raj_codes', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 8, username: 'emma.food', avatar: 'https://i.pravatar.cc/150?img=20' },
  { id: 9, username: 'noah_wild', avatar: 'https://i.pravatar.cc/150?img=14' },
];

const POSTS = [
  {
    id: 1, username: 'mike.travels', avatar: 'https://i.pravatar.cc/150?img=3',
    image: '/Img/post_sunset.png', caption: 'Golden hour at its finest 🌅 Nature never fails to amaze.',
    likes: 2847, time: '2 hours ago', location: 'Banff, Canada',
    comments: [
      { user: 'sara_k', text: 'This is absolutely stunning! 😍' },
      { user: 'priya_photo', text: 'The colors are unreal!' },
    ]
  },
  {
    id: 2, username: 'emma.food', avatar: 'https://i.pravatar.cc/150?img=20',
    image: '/Img/post_food.png', caption: 'Sunday brunch done right ☕🥑 Who else is obsessed with avocado toast?',
    likes: 1523, time: '4 hours ago', location: 'Brooklyn, NY',
    comments: [
      { user: 'luna.art', text: 'Making me hungry! 🤤' },
      { user: 'alex.dev', text: 'Need this right now' },
    ]
  },
  {
    id: 3, username: 'alex.dev', avatar: 'https://i.pravatar.cc/150?img=1',
    image: '/Img/post_cityscape.png', caption: 'City that never sleeps 🌃✨ Late night coding sessions with this view.',
    likes: 4201, time: '6 hours ago', location: 'Hong Kong',
    comments: [
      { user: 'raj_codes', text: 'Dream workspace! 💻' },
      { user: 'james.fit', text: 'Incredible shot!' },
    ]
  },
  {
    id: 4, username: 'priya_photo', avatar: 'https://i.pravatar.cc/150?img=9',
    image: '/Img/post_travel.png', caption: 'Paradise found 🏝️💙 Living my best island life.',
    likes: 6732, time: '8 hours ago', location: 'Maldives',
    comments: [
      { user: 'mike.travels', text: 'Adding this to my bucket list!' },
      { user: 'emma.food', text: 'Take me with you next time! 😭' },
    ]
  },
];

const SUGGESTIONS = [
  { username: 'david.photo', name: 'David Chen', avatar: 'https://i.pravatar.cc/150?img=7', reason: 'Followed by sara_k' },
  { username: 'nina.style', name: 'Nina Rodriguez', avatar: 'https://i.pravatar.cc/150?img=23', reason: 'Followed by alex.dev' },
  { username: 'arjun.music', name: 'Arjun Patel', avatar: 'https://i.pravatar.cc/150?img=33', reason: 'Suggested for you' },
  { username: 'chloe.yoga', name: 'Chloe Martin', avatar: 'https://i.pravatar.cc/150?img=25', reason: 'Followed by emma.food' },
  { username: 'leo.design', name: 'Leo Kim', avatar: 'https://i.pravatar.cc/150?img=51', reason: 'Suggested for you' },
];

/* ─── SVG Icons ─── */
const Icons = {
  home: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M9.005 16.545a2.997 2.997 0 0 1 2.997-2.997A2.997 2.997 0 0 1 15 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"/></svg>,
  search: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  explore: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="m9.5 9.5 5-2 -2 5-5 2z"/></svg>,
  reels: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="m10 8 6 4-6 4z"/></svg>,
  messenger: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/></svg>,
  heart: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  heartFilled: <svg width="24" height="24" viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  comment: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  share: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/></svg>,
  bookmark: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  bookmarkFilled: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>,
  create: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  more: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>,
  threads: <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017C1.5 8.418 2.35 5.564 3.995 3.514 5.845 1.21 8.598.028 12.179.004h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.281 3.263-.86 1.066-2.078 1.66-3.621 1.767-1.2.083-2.32-.177-3.238-.752-1.103-.69-1.763-1.818-1.858-3.176-.082-1.168.347-2.195 1.212-2.893.78-.63 1.834-.973 3.048-1.043 1.017-.058 1.96.028 2.822.262-.07-.672-.192-1.22-.373-1.657-.31-.752-.81-1.12-1.487-1.092-.576.024-1.005.305-1.275.832-.316.618-.427 1.518-.33 2.676l-2.006.295c-.134-1.6.074-2.903.618-3.87.578-1.027 1.502-1.612 2.74-1.663.08-.003.16-.005.241-.005 1.01 0 1.848.358 2.456 1.046.412.466.72 1.08.924 1.801.19-.05.384-.09.58-.12l.017 2.017c-.474.093-.916.217-1.316.37-.17.065-.327.146-.476.237.123.18.252.358.387.535.237.31.487.555.749.735.608.417 1.313.61 2.037.56 1.024-.071 1.79-.455 2.347-1.144.432-.536.739-1.29.898-2.264-.735-.352-1.565-.56-2.48-.622-.88-.06-1.63.048-2.17.305-.446.213-.708.524-.737.875-.034.414.152.757.527.99.462.29 1.133.442 1.887.39z"/></svg>,
  logout: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  emoji: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>,
  verified: <svg width="12" height="12" viewBox="0 0 40 40" fill="#0095f6"><path d="M19.998 3.094L14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v6.354h6.234L14.638 40l5.36-3.094L25.358 40l2.972-5.15h6.234v-6.354L40 25.359 36.905 20 40 14.641l-5.436-3.137V5.15h-6.234L25.358 0l-5.36 3.094zM18 26.752l-6.4-6.375 2.115-2.108 4.285 4.27 8.285-8.258 2.115 2.108L18 26.752z"/></svg>,
};

/* ─── Styles ─── */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.dashboard-root * { box-sizing: border-box; margin: 0; padding: 0; }
.dashboard-root {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #fafafa;
  min-height: 100vh;
  color: #262626;
  -webkit-font-smoothing: antialiased;
}

/* ─── Sidebar ─── */
.db-sidebar {
  position: fixed; left: 0; top: 0; bottom: 0;
  width: 244px; background: #fff;
  border-right: 1px solid #dbdbdb;
  padding: 8px 12px 20px;
  display: flex; flex-direction: column;
  z-index: 100;
  transition: width 0.3s ease;
}
.db-sidebar-logo {
  padding: 25px 12px 19px;
  font-family: 'Cookie', 'Segoe Script', cursive;
  font-size: 28px; font-weight: 400;
  cursor: pointer;
}
.db-sidebar-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.db-nav-item {
  display: flex; align-items: center; gap: 16px;
  padding: 12px; border-radius: 8px;
  cursor: pointer; font-size: 15px;
  transition: background 0.2s, transform 0.1s;
  text-decoration: none; color: #262626;
  position: relative;
}
.db-nav-item:hover { background: #f2f2f2; }
.db-nav-item:active { transform: scale(0.96); opacity: 0.7; }
.db-nav-item.active { font-weight: 700; }
.db-nav-item .nav-icon { display: flex; width: 24px; height: 24px; align-items: center; justify-content: center; flex-shrink: 0; }
.db-nav-item .nav-label { white-space: nowrap; }
.db-nav-avatar { width: 26px; height: 26px; border-radius: 50%; object-fit: cover; border: 2px solid transparent; }
.db-nav-item.active .db-nav-avatar { border-color: #262626; }
.db-sidebar-more { margin-top: auto; }

/* notification badge */
.db-nav-item .notif-badge {
  position: absolute; left: 30px; top: 8px;
  width: 8px; height: 8px; border-radius: 50%;
  background: #ed4956; border: 2px solid #fff;
}

/* ─── Main Layout ─── */
.db-main {
  margin-left: 244px;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}
.db-feed-area {
  max-width: 630px;
  width: 100%;
  padding-top: 36px;
}
.db-right-panel {
  width: 319px;
  flex-shrink: 0;
  margin-left: 64px;
  padding-top: 36px;
  position: sticky;
  top: 0;
  height: fit-content;
}

/* ─── Stories ─── */
.db-stories {
  background: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  padding: 16px 0;
  margin-bottom: 24px;
  overflow: hidden;
  position: relative;
}
.db-stories-inner {
  display: flex; gap: 15px;
  overflow-x: auto;
  padding: 0 16px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
}
.db-stories-inner::-webkit-scrollbar { display: none; }
.db-story-item {
  display: flex; flex-direction: column;
  align-items: center; gap: 6px;
  cursor: pointer; flex-shrink: 0;
}
.db-story-ring {
  width: 66px; height: 66px; border-radius: 50%;
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  padding: 3px;
  transition: transform 0.2s;
}
.db-story-ring.own { background: #ccc; }
.db-story-item:hover .db-story-ring { transform: scale(1.05); }
.db-story-ring img {
  width: 100%; height: 100%;
  border-radius: 50%; object-fit: cover;
  border: 3px solid #fff;
}
.db-story-username {
  font-size: 12px; max-width: 74px;
  overflow: hidden; text-overflow: ellipsis;
  white-space: nowrap; text-align: center;
}
.db-story-plus {
  position: absolute;
  bottom: -2px; right: -2px;
  width: 20px; height: 20px;
  background: #0095f6; border: 2px solid #fff;
  border-radius: 50%; color: #fff;
  font-size: 16px; line-height: 16px;
  display: flex; align-items: center; justify-content: center;
}
.db-story-ring-wrap { position: relative; }

/* ─── Post Card ─── */
.db-post {
  background: #fff;
  border: 1px solid #dbdbdb;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}
.db-post-header {
  display: flex; align-items: center;
  padding: 14px 16px;
  gap: 10px;
}
.db-post-avatar {
  width: 32px; height: 32px;
  border-radius: 50%; object-fit: cover;
  flex-shrink: 0;
}
.db-post-user-info { flex: 1; }
.db-post-username {
  font-weight: 600; font-size: 14px;
  display: flex; align-items: center; gap: 4px;
}
.db-post-location { font-size: 12px; color: #737373; margin-top: 1px; }
.db-post-more { cursor: pointer; color: #262626; padding: 8px; border-radius: 50%; transition: background 0.2s; }
.db-post-more:hover { background: #f2f2f2; }
.db-post-image {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
  background: #efefef;
}
.db-post-actions {
  display: flex; align-items: center;
  padding: 6px 16px 0;
  gap: 16px;
}
.db-post-actions .left { display: flex; gap: 16px; flex: 1; }
.db-post-action-btn {
  cursor: pointer; padding: 8px 0;
  transition: transform 0.15s, opacity 0.15s;
  display: flex;
}
.db-post-action-btn:hover { opacity: 0.6; }
.db-post-action-btn:active { transform: scale(1.2); }
.db-post-action-btn.liked { animation: likeAnim 0.4s ease; }
@keyframes likeAnim {
  0% { transform: scale(1); }
  25% { transform: scale(1.3); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}
.db-post-likes {
  padding: 0 16px;
  font-weight: 600; font-size: 14px;
}
.db-post-caption {
  padding: 4px 16px 0;
  font-size: 14px; line-height: 1.5;
}
.db-post-caption strong { font-weight: 600; margin-right: 6px; }
.db-post-comments-preview {
  padding: 4px 16px;
  font-size: 14px; color: #737373;
  cursor: pointer;
}
.db-post-comment-item {
  padding: 2px 16px;
  font-size: 14px; line-height: 1.4;
}
.db-post-comment-item strong { font-weight: 600; margin-right: 6px; }
.db-post-time {
  padding: 4px 16px 6px;
  font-size: 10px; color: #737373;
  text-transform: uppercase; letter-spacing: 0.2px;
}
.db-post-add-comment {
  display: flex; align-items: center;
  padding: 10px 16px;
  border-top: 1px solid #efefef;
  gap: 12px;
}
.db-post-add-comment .emoji-btn { cursor: pointer; display: flex; color: #262626; }
.db-post-add-comment input {
  flex: 1; border: none; outline: none;
  font-size: 14px; font-family: inherit;
  background: transparent;
}
.db-post-add-comment input::placeholder { color: #737373; }
.db-post-add-comment .post-btn {
  background: none; border: none;
  color: #0095f6; font-weight: 600;
  font-size: 14px; cursor: pointer;
  font-family: inherit;
  opacity: 0.3; transition: opacity 0.2s;
}
.db-post-add-comment .post-btn.active { opacity: 1; }

/* ─── Right Panel ─── */
.db-profile-card {
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 22px;
}
.db-profile-avatar {
  width: 56px; height: 56px;
  border-radius: 50%; object-fit: cover;
}
.db-profile-info { flex: 1; }
.db-profile-name { font-weight: 600; font-size: 14px; }
.db-profile-fullname { font-size: 14px; color: #737373; }
.db-switch-btn {
  background: none; border: none;
  color: #0095f6; font-weight: 600;
  font-size: 12px; cursor: pointer;
  font-family: inherit;
}
.db-suggestions-header {
  display: flex; justify-content: space-between;
  align-items: center; margin-bottom: 16px;
}
.db-suggestions-header span { color: #737373; font-weight: 600; font-size: 14px; }
.db-suggestions-header button {
  background: none; border: none;
  font-weight: 600; font-size: 12px;
  cursor: pointer; font-family: inherit;
}
.db-suggestion-item {
  display: flex; align-items: center;
  gap: 12px; margin-bottom: 12px;
}
.db-suggestion-avatar {
  width: 32px; height: 32px;
  border-radius: 50%; object-fit: cover;
}
.db-suggestion-info { flex: 1; }
.db-suggestion-username { font-weight: 600; font-size: 13px; }
.db-suggestion-reason { font-size: 12px; color: #737373; }
.db-follow-btn {
  background: none; border: none;
  color: #0095f6; font-weight: 600;
  font-size: 12px; cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
}
.db-follow-btn:hover { color: #00376b; }
.db-follow-btn.following { color: #262626; }
.db-right-footer {
  margin-top: 24px;
  font-size: 11px; color: #c7c7c7;
  line-height: 1.8;
}
.db-right-footer a { color: #c7c7c7; text-decoration: none; }
.db-right-footer a:hover { text-decoration: underline; }

/* ─── Double-tap heart ─── */
.db-post-image-wrap { position: relative; overflow: hidden; cursor: pointer; }
.db-double-tap-heart {
  position: absolute; top: 50%; left: 50%;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none; opacity: 0;
  z-index: 10;
}
.db-double-tap-heart.show {
  animation: doubleTapHeart 0.8s ease forwards;
}
@keyframes doubleTapHeart {
  0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
  15% { transform: translate(-50%, -50%) scale(1.2); opacity: 1; }
  30% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  75% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  100% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
}

/* ─── Responsive ─── */
@media (max-width: 1264px) {
  .db-right-panel { display: none; }
}
@media (max-width: 768px) {
  .db-sidebar { width: 72px; padding: 8px; align-items: center; }
  .db-sidebar-logo { font-size: 0; padding: 25px 0 19px; }
  .db-sidebar-logo::after { content: '📷'; font-size: 24px; }
  .db-nav-item .nav-label { display: none; }
  .db-nav-item { justify-content: center; padding: 12px; }
  .db-main { margin-left: 72px; }
}
@media (max-width: 480px) {
  .db-sidebar { display: none; }
  .db-main { margin-left: 0; }
  .db-mobile-nav {
    display: flex !important;
    position: fixed; bottom: 0; left: 0; right: 0;
    background: #fff; border-top: 1px solid #dbdbdb;
    padding: 10px 0; z-index: 100;
    justify-content: space-around;
  }
  .db-feed-area { padding-top: 16px; padding-bottom: 60px; }
}
.db-mobile-nav { display: none; }
`;

/* ─── Component ─── */
export default function Dashboard({ onLogout }) {
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [doubleTapped, setDoubleTapped] = useState({});
  const [followedUsers, setFollowedUsers] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const [activeNav, setActiveNav] = useState('Home');

  const toggleLike = (id) => {
    setLikedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id) => {
    setSavedPosts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleDoubleTap = (id) => {
    if (!likedPosts[id]) toggleLike(id);
    setDoubleTapped(prev => ({ ...prev, [id]: true }));
    setTimeout(() => setDoubleTapped(prev => ({ ...prev, [id]: false })), 900);
  };

  const toggleFollow = (username) => {
    setFollowedUsers(prev => ({ ...prev, [username]: !prev[username] }));
  };

  const formatLikes = (count) => count >= 1000 ? `${(count/1000).toFixed(1).replace(/\.0$/, '')}k` : count;

  const navItems = [
    { label: 'Home', icon: Icons.home },
    { label: 'Search', icon: Icons.search },
    { label: 'Explore', icon: Icons.explore },
    { label: 'Reels', icon: Icons.reels },
    { label: 'Messages', icon: Icons.messenger, notif: true },
    { label: 'Notifications', icon: Icons.heart },
    { label: 'Create', icon: Icons.create },
    { label: 'Profile', isProfile: true },
  ];

  return (
    <div className="dashboard-root">
      <style>{css}</style>

      {/* ─── Sidebar ─── */}
      <aside className="db-sidebar">
        <div className="db-sidebar-logo">Instagram</div>
        <nav className="db-sidebar-nav">
          {navItems.map(item => (
            <div
              key={item.label}
              className={`db-nav-item ${activeNav === item.label ? 'active' : ''}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="nav-icon">
                {item.isProfile ? (
                  <img
                    className="db-nav-avatar"
                    src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=0D8ABC&color=fff&size=52`}
                    alt="profile"
                  />
                ) : item.icon}
              </span>
              <span className="nav-label">{item.label}</span>
              {item.notif && <span className="notif-badge" />}
            </div>
          ))}
        </nav>
        <div className="db-sidebar-more">
          <div className="db-nav-item" onClick={() => setActiveNav('Threads')}>
            <span className="nav-icon">{Icons.threads}</span>
            <span className="nav-label">Threads</span>
          </div>
          <div className="db-nav-item" style={{ marginTop: 4 }}>
            <span className="nav-icon">{Icons.more}</span>
            <span className="nav-label">More</span>
          </div>
          {onLogout && (
            <div className="db-nav-item" onClick={onLogout} style={{ marginTop: 4, color: '#ed4956' }}>
              <span className="nav-icon">{Icons.logout}</span>
              <span className="nav-label">Log out</span>
            </div>
          )}
        </div>
      </aside>

      {/* ─── Main Content ─── */}
      <main className="db-main">
        <div className="db-feed-area">
          {/* Stories */}
          <div className="db-stories">
            <div className="db-stories-inner">
              {STORIES.map(story => (
                <div key={story.id} className="db-story-item">
                  <div className="db-story-ring-wrap">
                    <div className={`db-story-ring ${story.isOwn ? 'own' : ''}`}>
                      <img src={story.avatar} alt={story.username} />
                    </div>
                    {story.isOwn && <span className="db-story-plus">+</span>}
                  </div>
                  <span className="db-story-username">{story.username}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Posts */}
          {POSTS.map(post => (
            <article key={post.id} className="db-post">
              {/* Header */}
              <div className="db-post-header">
                <img className="db-post-avatar" src={post.avatar} alt={post.username} />
                <div className="db-post-user-info">
                  <div className="db-post-username">
                    {post.username} {Icons.verified}
                  </div>
                  {post.location && <div className="db-post-location">{post.location}</div>}
                </div>
                <div className="db-post-more">{Icons.more}</div>
              </div>

              {/* Image with double-tap */}
              <div className="db-post-image-wrap" onDoubleClick={() => handleDoubleTap(post.id)}>
                <img className="db-post-image" src={post.image} alt="post" loading="lazy" />
                <div className={`db-double-tap-heart ${doubleTapped[post.id] ? 'show' : ''}`}>
                  <svg width="80" height="80" viewBox="0 0 24 24" fill="#fff" stroke="#fff" strokeWidth="1">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                </div>
              </div>

              {/* Actions */}
              <div className="db-post-actions">
                <div className="left">
                  <span
                    className={`db-post-action-btn ${likedPosts[post.id] ? 'liked' : ''}`}
                    onClick={() => toggleLike(post.id)}
                  >
                    {likedPosts[post.id] ? Icons.heartFilled : Icons.heart}
                  </span>
                  <span className="db-post-action-btn">{Icons.comment}</span>
                  <span className="db-post-action-btn">{Icons.share}</span>
                </div>
                <span
                  className="db-post-action-btn"
                  onClick={() => toggleSave(post.id)}
                >
                  {savedPosts[post.id] ? Icons.bookmarkFilled : Icons.bookmark}
                </span>
              </div>

              {/* Likes */}
              <div className="db-post-likes">
                {formatLikes(post.likes + (likedPosts[post.id] ? 1 : 0))} likes
              </div>

              {/* Caption */}
              <div className="db-post-caption">
                <strong>{post.username}</strong>
                {post.caption}
              </div>

              {/* Comments preview */}
              <div className="db-post-comments-preview">
                View all {post.comments.length + 12} comments
              </div>
              {post.comments.slice(0, 2).map((c, i) => (
                <div key={i} className="db-post-comment-item">
                  <strong>{c.user}</strong>{c.text}
                </div>
              ))}

              {/* Time */}
              <div className="db-post-time">{post.time}</div>

              {/* Add Comment */}
              <div className="db-post-add-comment">
                <span className="emoji-btn">{Icons.emoji}</span>
                <input
                  type="text"
                  placeholder="Add a comment…"
                  value={commentTexts[post.id] || ''}
                  onChange={e => setCommentTexts(prev => ({ ...prev, [post.id]: e.target.value }))}
                />
                <button className={`post-btn ${commentTexts[post.id] ? 'active' : ''}`}>
                  Post
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ─── Right Panel ─── */}
        <div className="db-right-panel">
          {/* Profile card */}
          <div className="db-profile-card">
            <img
              className="db-profile-avatar"
              src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=0D8ABC&color=fff&size=112`}
              alt="profile"
            />
            <div className="db-profile-info">
              <div className="db-profile-name">{currentUser.username || currentUser.name}</div>
              <div className="db-profile-fullname">{currentUser.name}</div>
            </div>
            <button className="db-switch-btn">Switch</button>
          </div>

          {/* Suggestions */}
          <div className="db-suggestions-header">
            <span>Suggested for you</span>
            <button>See All</button>
          </div>
          {SUGGESTIONS.map(s => (
            <div key={s.username} className="db-suggestion-item">
              <img className="db-suggestion-avatar" src={s.avatar} alt={s.username} />
              <div className="db-suggestion-info">
                <div className="db-suggestion-username">{s.username}</div>
                <div className="db-suggestion-reason">{s.reason}</div>
              </div>
              <button
                className={`db-follow-btn ${followedUsers[s.username] ? 'following' : ''}`}
                onClick={() => toggleFollow(s.username)}
              >
                {followedUsers[s.username] ? 'Following' : 'Follow'}
              </button>
            </div>
          ))}

          {/* Footer */}
          <div className="db-right-footer">
            <div>
              <a href="#">About</a> · <a href="#">Help</a> · <a href="#">Press</a> · <a href="#">API</a> · <a href="#">Jobs</a> · <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Locations</a> · <a href="#">Language</a> · <a href="#">Meta Verified</a>
            </div>
            <div style={{ marginTop: 16 }}>© 2024 INSTAGRAM FROM META</div>
          </div>
        </div>
      </main>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="db-mobile-nav">
        <span className="db-post-action-btn">{Icons.home}</span>
        <span className="db-post-action-btn">{Icons.search}</span>
        <span className="db-post-action-btn">{Icons.create}</span>
        <span className="db-post-action-btn">{Icons.reels}</span>
        <img
          style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}
          src={`https://ui-avatars.com/api/?name=${currentUser.name}&background=0D8ABC&color=fff&size=48`}
          alt="profile"
        />
      </nav>
    </div>
  );
}