SET check_function_bodies = false;
INSERT INTO public.cause (id, name) VALUES (1, 'Combate ao abuso infantil e apoio às vítimas');
INSERT INTO public.cause (id, name) VALUES (2, 'Educação de crianças e jovens');
INSERT INTO public.cause (id, name) VALUES (3, 'Crianças desaparecidas');
INSERT INTO public.cause (id, name) VALUES (4, 'Crianças com deficiência');
INSERT INTO public.cause (id, name) VALUES (5, 'Apoio a crianças com câncer');
INSERT INTO public.cause (id, name) VALUES (6, 'Apoio a mulheres vítimas de violência');
INSERT INTO public.cause (id, name) VALUES (7, 'Empoderamento feminino');
INSERT INTO public.cause (id, name) VALUES (8, 'Combate à desigualdade racial');
INSERT INTO public.cause (id, name) VALUES (9, 'Apoio a pessoas em situação de rua');
INSERT INTO public.cause (id, name) VALUES (10, 'Apoio a adultos com câncer');
INSERT INTO public.cause (id, name) VALUES (11, 'Combate à pobreza');
INSERT INTO public.cause (id, name) VALUES (12, 'Inclusão de pessoas com deficiência');
INSERT INTO public.cause (id, name) VALUES (13, 'Apoio a dependentes químicos');
INSERT INTO public.cause (id, name) VALUES (14, 'Defesa dos direitos indígenas');
INSERT INTO public.cause (id, name) VALUES (15, 'Preservação do meio ambiente');
INSERT INTO public.cause (id, name) VALUES (16, 'Ajuda a animais abandonados');
SELECT pg_catalog.setval('public.cause_id_seq', 16, true);
