-- Migration: 002_create_analytics_events.sql
-- Purpose: Create analytics events table for tracking user activation and engagement
-- Date: 2026-08-27
-- Table: analytics_events - Tracks user interactions without storing sensitive response data

-- Create ENUM type for event types
CREATE TYPE event_type_enum AS ENUM (
  'page_view',
  'participate_click',
  'form_start',
  'form_step_progress',
  'form_step_abandon',
  'form_complete',
  'map_open',
  'share_whatsapp',
  'share_copy_link',
  'share_download_card',
  'expansion_register',
  'new_participation_alert'
);

-- Create ENUM type for traffic origin
CREATE TYPE event_origin_enum AS ENUM (
  'qr',
  'tablet',
  'instagram',
  'direct_link',
  'unknown'
);

-- Create ENUM type for device type
CREATE TYPE device_type_enum AS ENUM (
  'mobile',
  'tablet',
  'desktop'
);

-- Table: Analytics Events
-- Stores aggregated events about user interactions with NO sensitive response data
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_type event_type_enum NOT NULL,
  session_id VARCHAR(255) NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  page_path VARCHAR(255),
  origin event_origin_enum NOT NULL DEFAULT 'unknown'::event_origin_enum,
  step INTEGER,
  time_spent INTEGER,
  device_type device_type_enum NOT NULL DEFAULT 'desktop'::device_type_enum,
  browser VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for efficient querying
CREATE INDEX idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX idx_analytics_events_timestamp ON analytics_events(timestamp DESC);
CREATE INDEX idx_analytics_events_origin ON analytics_events(origin);
CREATE INDEX idx_analytics_events_device_type ON analytics_events(device_type);
CREATE INDEX idx_analytics_events_page_path ON analytics_events(page_path);
CREATE INDEX idx_analytics_events_created_at ON analytics_events(created_at DESC);

-- Composite indexes for common queries
CREATE INDEX idx_analytics_events_session_event ON analytics_events(session_id, event_type);
CREATE INDEX idx_analytics_events_time_range_type ON analytics_events(created_at DESC, event_type);

-- Enable RLS
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for analytics_events (Anonymous insertion only, no public read)
-- Anonymous users can INSERT events
CREATE POLICY "allow_insert_analytics_anonymous"
  ON analytics_events
  FOR INSERT
  WITH CHECK (true);

-- Anonymous users CANNOT read events (data privacy)
CREATE POLICY "block_select_analytics_public"
  ON analytics_events
  FOR SELECT
  USING (false);

-- Future: authenticated admin can read analytics with:
-- CREATE POLICY "allow_select_analytics_admin"
--   ON analytics_events
--   FOR SELECT
--   USING (auth.jwt() ->> 'role' = 'admin');

-- Add comments for documentation
COMMENT ON TABLE analytics_events IS 'Aggregated event tracking for user interactions with the Mapa do Cuidado. Contains ONLY non-sensitive metrics: event types, session IDs, device info, origin, and step numbers. NO response content, personal data, or clinical information is stored.';
COMMENT ON COLUMN analytics_events.session_id IS 'Client-generated session identifier to group related events from the same user session';
COMMENT ON COLUMN analytics_events.time_spent IS 'Time spent on a step or page in milliseconds';
COMMENT ON COLUMN analytics_events.step IS 'Form step number for form-related events (form_step_progress, form_step_abandon)';
