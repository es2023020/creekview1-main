
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  interest_type TEXT NOT NULL CHECK (interest_type IN ('more_info','eoi','call_back')),
  preferred_unit TEXT,
  budget_egp BIGINT,
  payment_years INT,
  estimated_installment BIGINT,
  notes TEXT,
  source TEXT DEFAULT 'creekview_landing',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (true);
