# Notion Client Proxy

Notion Client Proxy는 본래 Notion API Cors에 대응하며 데이터베이스를 다루기 위한 서버였습니다.

api.jiwoo.so 라는 도메인으로 다른 애플리케이션 API 구현을 위한 역할도 담당하게 되었습니다.

현재는 Memo, Music 애플리케이션의 API를 제공하고 있습니다.

## API

```
const API_URL = "https://api.jiwoo.so";
```

|URI|설명|용도|
|---|---|---|
|{API_URL}/memo|방명록 리스트를 담당|Memo App|
|{API_URL}/audio|음원 데이터 스트림 담당|Music App|
|{API_URL}/image|정적 이미지 리소스 제공|Image Static Server|

## 라이브러리

Node.js + Express로 기본적인 서버를 구성하였으며,

WS: Web Socket을 활용한 메모 등록 알림을 구현을 진행하였습니다.

Recoil은 다른 흐름의 방향을 가지는 부분에 데이터를 전달하기 위해 전역 데이터 스토어로 사용 중에 있습니다.

## 기능

- Audio : ?filename={filename} 쿼리 파라미터를 활용하여 음원 데이터 조회 및 스트림 제공
- Image : image URI 요청 시, 정적 리소스 접근이 가능하도록 허용 ( Audio 커버 이미지 제공으로 활용 중 )
- Memo : Memo 애플리케이션 등록과 조회를 담당 ( GET, POST )
- Socket : Memo 등록 시, Mac OS Dock 처럼 확인되지 않은 알림에 대한 통통 튀는 애니메이션을 구현하는데 활용
