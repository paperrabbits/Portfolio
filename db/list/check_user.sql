SELECT * FROM list_users lu
JOIN list_accounts la on lu.user_id = la.user_id
WHERE email = $1;

-- SELECT * FROM players p
-- JOIN accounts a ON p.player_id = a.player_id
-- WHERE email = $1;