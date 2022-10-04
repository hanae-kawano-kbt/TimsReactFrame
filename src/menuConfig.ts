export const OVERALL_REPORT_NAME = '工場全体'
export const TOP_REPORT_NAME = 'トップ'

// PowerBiのメニューの情報
// 最低でも下記の情報が必要
// export const menus: Menu[] = [
//   {
//     title: OVERALL_REPORT_NAME,
//     subMenu: [
//       {
//         title: TOP_REPORT_NAME,
//         embedUrl: `https://app.powerbi.com/reportEmbed?reportId=c9f90f14-696f-41ae-837e-77ba20d2120a`,
//         details: [],
//       },
//     ],
//   },
// ]

/* URLはpowerBIの埋め込み用リンクをそのまま使用してください */
export const menus: Menu[] = [
  {
    title: OVERALL_REPORT_NAME,
    noMenuFlag: true,
    anotherTabFlag: false,
    subMenu: [
      {
        title: TOP_REPORT_NAME,
        anotherTabFlag: false,
        noMenuFlag: true,
        embedUrl: `https://app.powerbi.com/reportEmbed?reportId=c9f90f14-696f-41ae-837e-77ba20d2120a&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D`,
        details: [
          {
            title: 'S',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=d53618c1-35c0-4f47-ad2e-175280c56105&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Q',
            anotherTabFlag: true,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=541e3ec7-7765-4b89-ac8b-18c2cddf1727&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
            underMenu : [ //仮
              {
                title: 'R工程',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=ead2a61f-48df-4138-81aa-a019152dd898&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
              {
                title: '人的',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=51e37c2d-cae7-45da-a269-cf828143a3b6&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
            ]
          },
          {
            title: 'C',
            anotherTabFlag: true,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=51e37c2d-cae7-45da-a269-cf828143a3b6&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'D',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=d82eb2cf-7413-4cd3-a32f-e7204364f883&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'E',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=fa6e616b-6981-436b-8a79-c353f0b0ea57&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Ma',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=e5005c13-c83b-4dfc-8ce2-64826dec054c&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Mc',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ead2a61f-48df-4138-81aa-a019152dd898&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
    ],
  },
  {
    title: 'トラクタ課',
    noMenuFlag: true,
    anotherTabFlag: true,
    subMenu: [
      {
        title: TOP_REPORT_NAME,
        anotherTabFlag: true,
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=d9027824-4ab8-4990-9205-27fb37247411&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        underMenu: [
          {
            title: '1',
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=9f630ce0-fdd2-4b35-a0e0-022e89f35145&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=9f630ce0-fdd2-4b35-a0e0-022e89f35145&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'S2',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=12f889c1-cf7d-4560-9125-65f333f3a437&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'S3',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=d7082551-5b18-4180-ae77-3cbb28d45d3e&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Q',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ff7e14c4-0316-4bfe-a60d-330474acb547&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'C',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=c60f273c-e7ee-4832-80d1-c5328d7c4f47&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'D',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=d09b6c0d-3191-44e2-a163-cd58b21a99c6&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'E',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=de8ebefb-73b1-447d-806a-09b461477733&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Ma',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=b56c2ff0-23d9-4a23-8ca1-30ca4d9379f7&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Mc',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=f8122a34-fa6c-4034-9097-61b423436606&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
    ],
  },
  {
    title: 'エンジン課',
    noMenuFlag: true,
    anotherTabFlag: false,
    subMenu: [
      {
        title: TOP_REPORT_NAME,
        anotherTabFlag: false,
        noMenuFlag: true,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=d9027824-4ab8-4990-9205-27fb37247411&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=9f630ce0-fdd2-4b35-a0e0-022e89f35145',
            underMenu : [
              {
                title: 'R工程',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=a4c0a208-7b51-4fdc-b2fc-205ec1ac1843&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
              {
                title: '人的',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=955bd434-554a-4222-b25c-32ccc9372e75&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
            ]
          },
          {
            title: 'S2',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=70e9b657-c08b-4868-8d99-59a84f106629&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'S3',
            anotherTabFlag: false,
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=70e9b657-c08b-4868-8d99-59a84f106629&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D', 
          },
          {
            title: 'Q',
            anotherTabFlag: false,
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=ff7e14c4-0316-4bfe-a60d-330474acb547',
            underMenu : [
              {
                title: '1',
                embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=a4c0a208-7b51-4fdc-b2fc-205ec1ac1843&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D'
              },
              {
                title: '2',
                embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=70e9b657-c08b-4868-8d99-59a84f106629&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D'
              },
            ]
          },
          {
            title: 'C',
            anotherTabFlag: false,
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=9836b875-02b8-42ef-a7c3-e1b6ed5be262&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'D',
            anotherTabFlag: false,
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=d09b6c0d-3191-44e2-a163-cd58b21a99c6',
            underMenu : [
              {
                title: '1可動率',
                embedUrl:
                'https://app.powerbi.com/reportEmbed?reportId=4bb6af34-d42d-463b-b8fc-94e2f9db5067&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
              {
                title: '2出来高',
                embedUrl:
                'https://app.powerbi.com/reportEmbed?reportId=4152336d-8eb3-4275-a6ef-871efcebab5b&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
            ]
          },
          {
            title: 'E',
            anotherTabFlag: false,
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=9836b875-02b8-42ef-a7c3-e1b6ed5be262&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Ma',
            anotherTabFlag: false,
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=6860e9bd-3175-4d2e-adee-5cbd0bdd63cd&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Mc',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=9836b875-02b8-42ef-a7c3-e1b6ed5be262&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'T',
            anotherTabFlag: false,
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=9836b875-02b8-42ef-a7c3-e1b6ed5be262&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
    ],
  },
  {
    title: '機械課',
    noMenuFlag: true,
    anotherTabFlag: true,
    subMenu: [
      { // 仮URL
        title: TOP_REPORT_NAME,
        anotherTabFlag: false,
        noMenuFlag: true,
        embedUrl:
        'https://app.powerbi.com/reportEmbed?reportId=ead2a61f-48df-4138-81aa-a019152dd898&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=d53618c1-35c0-4f47-ad2e-175280c56105&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'S2',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=541e3ec7-7765-4b89-ac8b-18c2cddf1727&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'S3',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=51e37c2d-cae7-45da-a269-cf828143a3b6&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Q',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=d82eb2cf-7413-4cd3-a32f-e7204364f883&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
            underMenu : [
              {
                title: '1',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=ead2a61f-48df-4138-81aa-a019152dd898&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
              {
                title: '2',
                embedUrl:
                  'https://app.powerbi.com/reportEmbed?reportId=51e37c2d-cae7-45da-a269-cf828143a3b6&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
              },
            ]
          },
          {
            title: 'C',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=51e37c2d-cae7-45da-a269-cf828143a3b6&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'D',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=d82eb2cf-7413-4cd3-a32f-e7204364f883&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'E',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=fa6e616b-6981-436b-8a79-c353f0b0ea57&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Ma',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=e5005c13-c83b-4dfc-8ce2-64826dec054c&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'Mc',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ead2a61f-48df-4138-81aa-a019152dd898&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
          {
            title: 'T',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=ead2a61f-48df-4138-81aa-a019152dd898&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
    ],
  },
  {
    title: '検査課',
    noMenuFlag: false,
    anotherTabFlag: false,
    subMenu: [
      {
        title: '検査課品質管理',
        anotherTabFlag: false,
        noMenuFlag: false,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=b56c2ff0-23d9-4a23-8ca1-30ca4d9379f7&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: true,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=9052e971-390e-432e-9574-9b1eff6e8a6d&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
      {
        title: '軸力測定',
        anotherTabFlag: false,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=541e3ec7-7765-4b89-ac8b-18c2cddf1727&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'hhttps://app.powerbi.com/reportEmbed?reportId=de8ebefb-73b1-447d-806a-09b461477733&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
    ],
  },
  {
    title: 'KPS推進課',
    noMenuFlag: false,
    anotherTabFlag: false,
    subMenu: [
      {
        title: 'ペーパーレスモニタリング',
        anotherTabFlag: true,
        noMenuFlag: false,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=a4c0a208-7b51-4fdc-b2fc-205ec1ac1843&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=9f630ce0-fdd2-4b35-a0e0-022e89f35145&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
      {
        title: '環境パフォーマンス',
        anotherTabFlag: false,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=12f889c1-cf7d-4560-9125-65f333f3a437&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=70e9b657-c08b-4868-8d99-59a84f106629&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
      {
        title: '産業廃棄物分析',
        anotherTabFlag: false,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=d09b6c0d-3191-44e2-a163-cd58b21a99c6&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=c60f273c-e7ee-4832-80d1-c5328d7c4f47&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
    ],
  },
  {
    title: '勤労課',
    noMenuFlag: false,
    anotherTabFlag: false,
    subMenu: [
      {
        title: '離職率人数分析',
        anotherTabFlag: false,
        noMenuFlag: false,
        embedUrl:
          'https://app.powerbi.com/reportEmbed?reportId=d7082551-5b18-4180-ae77-3cbb28d45d3e&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
        details: [
          {
            title: 'S1',
            anotherTabFlag: false,
            embedUrl:
              'https://app.powerbi.com/reportEmbed?reportId=4bb6af34-d42d-463b-b8fc-94e2f9db5067&autoAuth=true&ctid=3756f196-d7db-451b-b2a9-9e1a01855fe1&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D',
          },
        ],
      },
    ],
  },
]

export type Under = {
  title: string
  embedUrl: string,
}

export type Detail = {
  title: string
  embedUrl: string,
  underMenu?: Under[]
  anotherTabFlag: boolean //別タブで開くか否か
}

export type SubMenu = {
  title: string
  embedUrl: string
  anotherTabFlag: boolean //別タブで開くか否か
  noMenuFlag?: boolean //メニューを表示するか否か
  details: Detail[]
  underMenu?: Under[]
}

export type Menu = {
  title: string
  subMenu: SubMenu[]
  noMenuFlag?: boolean //メニューを表示するか否か
  anotherTabFlag: boolean //別タブで開くか否か
}
