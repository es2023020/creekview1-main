
CREATE OR REPLACE FUNCTION public.validate_lead()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
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
  NEW.source := 'creekview_landing';
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS leads_validate ON public.leads;
CREATE TRIGGER leads_validate BEFORE INSERT ON public.leads
  FOR EACH ROW EXECUTE FUNCTION public.validate_lead();
