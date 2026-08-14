-- 餘溫 (YEO·ON) — 시드 데이터 (기존 src/mock/*.ts 이관)
-- 0001_init.sql 실행 후 Supabase SQL Editor에서 실행할 것

insert into profiles (id, name, birth_date, death_date, quote, main_image)
values (
  'stone01',
  '홍길동',
  '1931.05.10',
  '2023.06.22',
  '영원히 기억하겠습니다',
  '/memorial1.png'
)
on conflict (id) do update set
  name = excluded.name,
  birth_date = excluded.birth_date,
  death_date = excluded.death_date,
  quote = excluded.quote,
  main_image = excluded.main_image;

delete from memorial_messages where profile_id = 'stone01';

insert into memorial_messages (profile_id, date, relation, title, body, photo, sort) values
('stone01', '2026.03.04', '손녀딸', '할아버지 보고싶어요', ARRAY[
  '할아버지,',
  '요즘도 문득문득 할아버지 생각이 나요.',
  '손 잡아주시던 따뜻함이 아직도 생생해요.',
  '보고 싶어요, 할아버지.'
]::text[], null, 0),

('stone01', '2026.02.11', '사랑스러운 막내딸', '아빠 늘 행복하길', ARRAY[
  '아빠,',
  '오늘도 문득 아빠 생각이 나서 이렇게 편지를 써봐.',
  '이제는 나도 누군가의 부모가 되었는데, 그제야 아빠 마음을 조금 알 것 같아.',
  '어릴 땐 당연하게만 느꼈던 아빠의 사랑이 얼마나 큰 거였는지 이제야 깨닫는다.',
  '힘들 때마다 아무 말 없이 내 편이 되어주던 사람, 그게 아빠였지.',
  '아빠가 손잡아주던 기억은 아직도 내 마음 한쪽에 따뜻하게 남아 있어.',
  '우리 아이를 안고 있으면, 어쩌면 아빠도 나를 이렇게 바라봤겠구나 싶어 울컥해져.',
  '한 번만이라도 "잘하고 있다"는 말 다시 듣고 싶은 날들이 많아.',
  '아빠가 보고 싶고, 또 많이 그리워.',
  '다음에 다시 만나는 날엔 꼭 오래 안아줄게, 사랑해 아빠.'
]::text[], '/memorial2.png', 1),

('stone01', '2026.01.20', '첫번째친구', '항상 힘이 되었던 그대에게', ARRAY[
  '친구야,',
  '네가 없으니 허전한 날들이 많아.',
  '힘들 때마다 옆에서 힘이 되어줘서 고마웠어.',
  '그곳에서는 편히 쉬고 있길 바라.'
]::text[], null, 2),

('stone01', '2026.03.11', '보고싶다', '보고싶어서 방문했었어요', ARRAY[
  '오늘 근처에 올 일이 있어서 잠깐 들렀어요.',
  '이렇게라도 얼굴 보러 올 수 있어서 다행이에요.',
  '항상 그립고, 항상 감사해요.'
]::text[], null, 3),

('stone01', '2026.02.11', '막둥이', '힘이 되어주던 든든한 존재', ARRAY[
  '아버지,',
  '말없이 늘 든든하게 지켜봐 주셨던 거, 다 알고 있었어요.',
  '그 믿음 덕분에 여기까지 올 수 있었어요.',
  '감사하고, 사랑합니다.'
]::text[], null, 4),

('stone01', '2026.01.20', '당신의사랑', '옆에 있어줘서 고마웠어요', ARRAY[
  '여보,',
  '오랜 세월 옆에 있어줘서 정말 고마웠어요.',
  '함께한 시간들이 다 소중한 기억이에요.',
  '많이 보고 싶어요.'
]::text[], null, 5);

delete from memories where profile_id = 'stone01';

insert into memories (profile_id, date, title, desc, src, sort) values
('stone01', '2023.05.03', '우리가족 단체사진', ARRAY['우리아빠 퇴원했던 날!', '밝은 웃음 보니까 너무 행복해']::text[], '/memory2.png', 0),
('stone01', '2022.10.08', '행복해요 당신덕에', ARRAY['칠순잔치 우리 남편 잘 웃고 다정하시네', '사랑해요']::text[], '/memory3.png', 1),
('stone01', '2019.11.10', '도율이가 그렇게 좋아?', ARRAY['아빠 도율이 벌써 초등학생이야', '할아버지보고싶다고 같이 왔어 사랑해']::text[], '/memory4.png', 2),
('stone01', '2018.04.08', '피곤하다고 우리가라며~', ARRAY['아부지 못오시니 얼마나좋아', '보고싶다 우리 아빠']::text[], '/memory5.png', 3),
('stone01', '1970.03.05', '결혼기념일', ARRAY['이보 고생많이해서 얼굴 많이 상했었네', '지금이라도 다시 올리고싶다~']::text[], '/memory6.png', 4),
('stone01', '2000.11.20', '다시 찍은 웨딩', ARRAY['매년 우리이보가 나랑 찍자던거', '난 너무 좋았어 사랑해']::text[], '/memory7.png', 5);

-- 데모 시연용 초기 활성 세션 (실제 NFC 연동 전 UI 확인용 — 필요 없으면 profile_id를 null로 되돌릴 것)
update active_session set profile_id = 'stone01', updated_at = now() where id = 'kiosk-01';
