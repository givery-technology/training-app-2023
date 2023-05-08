INSERT INTO hello_worlds (lang, message) VALUES ('en', 'Hello World');
INSERT INTO hello_worlds (lang, message) VALUES ('ja', 'こんにちは 世界');

INSERT INTO users (name, password) VALUES ('taro', '$2a$12$2cv5O.FaITyNSBqlS./zKOotzB8AuWIojHVjLvz/e3jiEn0xYAnBS');
INSERT INTO users (name, password) VALUES ('hanako', '$2a$12$4bTKrmghvw8FFfTyb/8S/O2GGD6WsKHOnv/DUuFKhg3TO8dHxkj.W');

INSERT INTO posts (user_id, title, body) VALUES (1, 'test1', '質問1\n改行');
INSERT INTO posts (user_id, title, body) VALUES (1, 'test2', '質問2\n改行');

INSERT INTO comments (user_id, post_id, body) VALUES (2, 1, 'コメント1\n改行');
INSERT INTO comments (user_id, post_id, body) VALUES (2, 1, 'コメント2\n改行');
INSERT INTO comments (user_id, post_id, body) VALUES (2, 2, 'コメント3\n改行');
