export const getRouteParam = (n) => window.location.pathname.split("/")[n];

export const isoDate = (date) => (new Date(date)).toISOString().split('T')[0];

export const extractFormInput = (form) => Object.fromEntries((new FormData(form)).entries());