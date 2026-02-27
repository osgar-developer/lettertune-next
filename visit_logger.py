import os
import psycopg
from psycopg.rows import dict_row
from datetime import datetime, timezone

DDL = """
CREATE TABLE IF NOT EXISTS visit_events (
  id BIGSERIAL PRIMARY KEY,
  visited_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip TEXT,
  user_agent TEXT,
  browser TEXT,
  os TEXT,
  path TEXT,
  referrer TEXT,
  accept_language TEXT
);

CREATE INDEX IF NOT EXISTS idx_visit_events_visited_at ON visit_events (visited_at DESC);
"""

def _get_conn():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise RuntimeError("DATABASE_URL not set. Attach a Render Postgres DB.")
    return psycopg.connect(db_url, autocommit=True)

def init_visit_table():
    with _get_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(DDL)

def _get_client_ip(flask_request):
    """
    Render/Gunicorn typically sits behind a proxy.
    X-Forwarded-For is the best source (first IP is the client).
    """
    xff = flask_request.headers.get("X-Forwarded-For", "")
    if xff:
        # e.g. "1.2.3.4, 10.0.0.1"
        return xff.split(",")[0].strip()
    return flask_request.remote_addr

def _simple_parse_ua(ua: str):
    """
    Lightweight UA parsing without extra dependencies.
    (You can later replace this with `user-agents` library for better accuracy.)
    """
    ua_l = (ua or "").lower()

    # Browser (very rough)
    if "edg/" in ua_l:
        browser = "Edge"
    elif "chrome/" in ua_l and "safari/" in ua_l:
        browser = "Chrome"
    elif "safari/" in ua_l and "chrome/" not in ua_l:
        browser = "Safari"
    elif "firefox/" in ua_l:
        browser = "Firefox"
    else:
        browser = "Other"

    # OS (rough)
    if "windows" in ua_l:
        os_name = "Windows"
    elif "mac os x" in ua_l or "macintosh" in ua_l:
        os_name = "macOS"
    elif "android" in ua_l:
        os_name = "Android"
    elif "iphone" in ua_l or "ipad" in ua_l or "ios" in ua_l:
        os_name = "iOS"
    elif "linux" in ua_l:
        os_name = "Linux"
    else:
        os_name = "Other"

    return browser, os_name

def log_visit(flask_request):
    ip = _get_client_ip(flask_request)
    ua = flask_request.headers.get("User-Agent", "")
    browser, os_name = _simple_parse_ua(ua)

    path = flask_request.path
    referrer = flask_request.headers.get("Referer", "")
    accept_language = flask_request.headers.get("Accept-Language", "")

    with _get_conn() as conn:
        with conn.cursor(row_factory=dict_row) as cur:
            cur.execute(
                """
                INSERT INTO visit_events (ip, user_agent, browser, os, path, referrer, accept_language)
                VALUES (%s, %s, %s, %s, %s, %s, %s);
                """,
                (ip, ua, browser, os_name, path, referrer, accept_language),
            )
