SET check_function_bodies = false;
INSERT INTO public.category (id, name) VALUES (5, 'Saúde');
INSERT INTO public.category (id, name) VALUES (1, 'Alimentos');
INSERT INTO public.category (id, name) VALUES (2, 'Higiene e Limpeza');
INSERT INTO public.category (id, name) VALUES (3, 'Agasalhos');
INSERT INTO public.category (id, name) VALUES (4, 'Lazer');
SELECT pg_catalog.setval('public.category_id_seq', 49, true);
