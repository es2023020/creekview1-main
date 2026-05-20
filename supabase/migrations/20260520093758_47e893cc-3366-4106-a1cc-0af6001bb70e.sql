ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS whatsapp_number text,
  ADD COLUMN IF NOT EXISTS preferred_call_date date,
  ADD COLUMN IF NOT EXISTS preferred_call_time text;

CREATE OR REPLACE FUNCTION public.validate_lead()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $function$
BEGIN
  IF length(btrim(NEW.full_name)) < 2 OR length(NEW.full_name) > 120 THEN
    RAISE EXCEPTION 'Invalid name';
  END IF;
  IF length(btrim(NEW.phone)) < 6 OR length(NEW.phone) > 32 THEN
    RAISE EXCEPTION 'Invalid phone';
  END IF;
  IF NEW.email IS NOT NULL AND length(NEW.email) > 255 THEN
    RAISE EXCEPTION 'Invalid email';
  END IF;
  IF NEW.notes IS NOT NULL AND length(NEW.notes) > 2000 THEN
    RAISE EXCEPTION 'Notes too long';
  END IF;
  IF NEW.whatsapp_number IS NOT NULL AND (length(btrim(NEW.whatsapp_number)) < 6 OR length(NEW.whatsapp_number) > 32) THEN
    RAISE EXCEPTION 'Invalid WhatsApp number';
  END IF;
  IF NEW.preferred_call_time IS NOT NULL AND length(NEW.preferred_call_time) > 32 THEN
    RAISE EXCEPTION 'Invalid call time';
  END IF;
  NEW.source := 'creekview_landing';
  RETURN NEW;
END;
$function$;