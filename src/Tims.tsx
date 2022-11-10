import { Box, Paper, SvgIcon } from '@mui/material'
import { FC, useEffect, useState, useRef, useMemo } from 'react'
import { MenuBar } from './components/Menu'
import { Header } from './components/Header'
import { Theme, Collapse } from '@mui/material'
import { Menu as MuiMenu, MenuItem } from '@mui/material'
import { UserAgentApplication, AuthError, AuthResponse } from 'msal'
import { clientId, scopes } from './authConfig'
import { PowerBIEmbed } from 'powerbi-client-react'
import { models, Report, service, Embed } from 'powerbi-client'
import 'powerbi-report-authoring'
import {
  menus,
  Detail,
  Under,
  OVERALL_REPORT_NAME,
  TOP_REPORT_NAME,
} from './menuConfig'

// DatePickerインストール
import { YearPickerCalendar } from './components/YearPickerCalendar'
import { MonthPickerCalendar } from './components/MonthPickerCalendar'
import { WeekPickerCalendar } from './components/WeekPickerCalendar'
import { DayPickerCalendar } from './components/DayPickerCalendar'


const styles = {
  root: {
    width: '100%'
  },
  collapseRoot: {
    zIndex: 1000,
    position: 'absolute',
    boxShadow: '0px 3px 6px #2C28281C'
  },
  contentContainer: {
    height: 'calc(100vh - 13px)',
    windth: '100vw',
    overflow: 'hidden',
    flexGrow: '1',
    padding: '13px 26px 0 30px',
    display: 'flex',
    flexDirection: 'column',
    color: (theme: Theme) => theme.colors.white,
    background: (theme: Theme) =>
      `linear-gradient(180deg, ${theme.colors.mainGreen} 137px, transparent 0%)`,
  },
  btnList: {
    position: 'relative',
    height: '70px'
  },
  topBtn: {
    padding: '13px 0'
  },
  btnMenu: {
    display: 'flex',
    position: 'absolute',
    left: '60px',
    padding: '13px 0'
  },
  powerbiContainer: {
    flexGrow: '1',
    marginTop: '13px',
    borderRadius: '0',
    background: 'none',
    padding: '0',
    boxShadow: 'none'
  },
  backBtn: {
    height: 44,
    width: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    border: (theme: Theme) => `1px solid ${theme.colors.line}`,
    borderRadius: 2,
    boxShadow: '0px 3px 6px #1717172d',
    '&:hover': {
      color: (theme: Theme) => theme.colors.mainGreen,
      backgroundColor: (theme: Theme) => theme.colors.white,
    },
  },
  btn: {
    height: 44,
    minWidth: 80,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28b8b9',
    cursor: 'pointer',
    border: (theme: Theme) => `1px solid ${theme.colors.line}`,
    '&:nth-of-type(1)': {
      borderRight: 'none',
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    '&:last-child': {
      borderLeft: 'none',
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
    },
    '&:hover': {
      color: (theme: Theme) => theme.colors.mainGreen,
      backgroundColor: (theme: Theme) => theme.colors.white,
    },
  },
  clickedBtn: {
    color: (theme: Theme) => theme.colors.mainGreen,
    backgroundColor: (theme: Theme) => theme.colors.white,
  },
  bookmarksContainer: {
    position: 'relative',
    boxShadow: '0px 3px 6px #1717172d',
    borderRadius: '8px',
  },
  subMenu: {
    transform: 'translate(0, -21.5px)',
    '& .MuiList-root': {
      py: '11px',
    },
    '& .MuiMenuItem-root': {
      padding: '4px 14px',
      color: '#41424b',
    },
  },
  subMenuPaper: {
    background: '#d8efef',
    overflow: 'visible',
    filter: 'drop-shadow(0px 3px 6px #2c28281c)',
    borderRadius: 0,
    mt: 1.5,
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: 20,
      width: 20,
      height: 20,
      bgcolor: '#d8efef',
      transform: 'translate(-50%, -50%) rotate(45deg)',
      zIndex: 0,
    },
  }
}

export type CurrentMenu = {
  mainTitle: string
  subMenuTitle: string | undefined
  subMenuEmbedUrl: string | undefined
  subMenuDateSlicerType?: string | undefined //subMenu日付スライサー種別
  detailTitle: string | undefined
  detailEmbedUrl: string | undefined
  detailsDateSlicerType?: string | undefined //details日付スライサー種別
  underMenu: Under[] | undefined
  underMenuTitle: string | undefined
  underMenuEmbedUrl: string | undefined
  noMenuFlag: boolean | undefined
}

export const Tims: FC = () => {
  // 現在表示しているPowerBIの情報
  // 初期で工場全体の情報を設定する
  const [currentMenu, setCurrentMenu] = useState<CurrentMenu>({
    // 初期でmainTitleが「工場全体」
    mainTitle: menus[0].title,
    // 初期でsubMenuTitleが「トップ」
    // ※工場全体の場合に、「トップ」を定義しているが、サイドメニューに表示する必要ない、「工場全体」のメニューを押下すると、すぐ「工場全体」のPowerBIを表示する）
    // ※「工場全体」のメニュー以外はメニューをクリックするとサブメニューが現れる
    subMenuTitle: menus[0].subMenu[0].title,
    subMenuEmbedUrl: menus[0].subMenu[0].embedUrl,
    subMenuDateSlicerType: menus[0].subMenu[0].dateSlicerType, //subMenu日付スライサー種別
    // 「S」「Q」「Mc」などのヘッダーのメニュー
    //　初期でなのも設定しない
    detailTitle: undefined,
    detailEmbedUrl: undefined,
    underMenu: undefined,
    underMenuTitle: undefined,
    underMenuEmbedUrl: undefined,
    detailsDateSlicerType: undefined, //details日付スライサー種別
    // 課の下層メニューがあるかないか
    noMenuFlag: menus[0].noMenuFlag ? menus[0].noMenuFlag : false
  })
  // ブックマークのリスト
  const [bookmarks, setBookmarks] = useState<
    models.IReportBookmark[] | undefined
  >(undefined)
  // 選択しているブックマーク
  const [currentBookmark, setCurrentBookmark] = useState<
    models.IReportBookmark | undefined
  >(undefined)
  // サイドメニューが展開しているかステート
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false)
  // レポートDOMのrefを保管するref
  const reportRef = useRef<Report | undefined>(undefined)
  // トークン
  // アイエンター社内に開発する時、PowerBIのサイトからトークンを取って開発する（1時間ごとに再取得必要）
  // クボタ様を渡す時に、「undefined」で設定
  const accessToken = useRef<string | undefined>(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvMzc1NmYxOTYtZDdkYi00NTFiLWIyYTktOWUxYTAxODU1ZmUxLyIsImlhdCI6MTY2ODA2ODc3MSwibmJmIjoxNjY4MDY4NzcxLCJleHAiOjE2NjgwNzQwMjMsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFsUDdrYWo4ZGUvOWRUMW90N2g2RjgvRVlsWWhSZDJBUjRqTlc1V0ozM1ZPdncxWmVsN0FXRVZnaUJrREovenJ4c3BUNUduOXdrZDhjMk5yai9LbVZHSUVuZ2EwUnA0OWhRSS82cVQvVis2bz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiLmsrPph44iLCJnaXZlbl9uYW1lIjoi6Iux5oG1IiwiaXBhZGRyIjoiMjE3LjE3OC4xOS42IiwibmFtZSI6Iuays-mHjiDoi7HmgbUiLCJvaWQiOiIxOTEzNTRjMy1lZTBjLTRiZjQtYTAzNy1hZjZjMmFhNDlhMWYiLCJvbnByZW1fc2lkIjoiUy0xLTUtMjEtMzA0MzQ1OTY1Ny0zNDY4NDYyNDU4LTIwMjUyMDM2ODUtMTkzMjUiLCJwdWlkIjoiMTAwMzIwMDExREMzNUUwMyIsInJoIjoiMC5BVDBBbHZGV045dlhHMFd5cVo0YUFZVmY0UWtBQUFBQUFBQUF3QUFBQUFBQUFBQTlBSVEuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiSmNub3VJYkZwT3dGZXJEUC1DcWtXRUdrXzh2bWJwNUloY19IZ1BkQjdzTSIsInRpZCI6IjM3NTZmMTk2LWQ3ZGItNDUxYi1iMmE5LTllMWEwMTg1NWZlMSIsInVuaXF1ZV9uYW1lIjoiaC1rYXdhbm9AaS1lbnRlci5jby5qcCIsInVwbiI6Imgta2F3YW5vQGktZW50ZXIuY28uanAiLCJ1dGkiOiJSMVhGNS1vWVgwU3RKcjlZVm9LZ0FBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.Vx4YUYBBZle6Xi5qSJjTCBCszAd_KmN9U6FwgVndhg_q_JPUBR7RmTu-4px13OLdEB76pKE9eP1NiBEzYSSW_2ycCedHntfMMp344SR8tPJPRndmIgW8tt1PYCfv3cLiMN3v7u9qh5-Nad4eQMXrYaM44nMxBCNsZ1uc3r27Wa3wqhffCQCG_DwWPHHwEC6VqA9T7VHO9m27p0cGngZdIHH7GHE2_Syu95gfsJmjpIKprCwDposuhMdwmljDNJXcaBhG1cII5RVtcSag_ZgnPjL81ORqlH8M39THK8B3fNkfRVWKFKJBuF-YBjRKyu_11O3YesNQxJIMLtoLeyAoHQ'
  )
  // フィルターを開発する
  const slicerState = useRef<any>([])
  // 最下層メニューの開閉
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    mainTitle: string
  ) => {
    setAnchorEl(event.currentTarget)
  }
  // 最下層メニューの開閉
  const handleClose = () => {
    setAnchorEl(null)
  }


  // 「工場全体」のPowerBIを表示しているか変数
  const isMainPage = useMemo(
    () =>
      currentMenu.mainTitle === OVERALL_REPORT_NAME &&
      currentMenu.subMenuTitle === TOP_REPORT_NAME &&
      currentMenu.detailTitle === undefined,
    [currentMenu]
  )

  // PowerBIを表示するのに設定の値
  const [reportConfig, setReportConfig] =
    useState<models.IReportEmbedConfiguration>({
      type: 'report',
      // 表示するembedUrl
      embedUrl: undefined,
      // トークン
      accessToken: undefined,
      // トークンのタイプ
      //　アイエンター内に実装する時に、「Aad」にする
      // クボタ様を渡す時に、「Embed」で設定
      tokenType: models.TokenType.Aad,
      // tokenType: models.TokenType.Embed,
      settings: {
        panes: {
          filters: {
            // フィルターパネルを表示しないように設定
            expanded: false,
            visible: false,
          },
          pageNavigation: {
            // エクセルみたいに下ページパネルを表示しないように設定
            visible: false,
          },
        },
      }
    })

  const eventHandlersMap = new Map([
    // PowerBIが取得される時
    [
      'loaded',
      async () => {
        console.log('Report has loaded')
        if (reportRef.current === undefined) return

        try {
          // ブックマークを取得
          const bookmarks =
            await reportRef.current.bookmarksManager.getBookmarks()
          // 「()」で囲まれるブックマークしか取得しない
          const filteredBookmarks = bookmarks.filter((item) =>
            /^\(.+\)$/.test(item.displayName)
          )
          //　ブックマークのリストをセット
          setBookmarks(filteredBookmarks)
          if (currentBookmark === undefined)
            setCurrentBookmark(filteredBookmarks[0])

          // 選択したフィルターを反映
          console.log('選択されているフィルターが0かどうか確認: ' + slicerState.current.length)
          if (slicerState.current.length === 0) return
          const pages = await reportRef.current!.getPages()
          const activePage = pages?.filter(function (page) {
            return page.isActive
          })[0]
          if (!activePage) return
          const visuals = await activePage.getVisuals()
          const slicers = visuals.filter((visual) => {
            return visual.type === 'slicer'
          })
          slicers.forEach(async (slicer) => {
            const state = await slicer.getSlicerState()
            // @ts-ignore
            const columnTarget = state.targets[0].column
            // @ts-ignore
            const tableTarget = state.targets[0].table

            // 設定したフィルターを検索する
            const savedState = slicerState.current.find(
              (slicerState: any) =>
                slicerState.targets[0].column === columnTarget &&
                slicerState.targets[0].table === tableTarget
            )
            // 設定したフィルターを設定する
            if (savedState !== undefined) {
              console.log('load時値直接セット')
              await slicer.setSlicerState({
                filters: [...savedState.filters]
              })
            }
          })
        } catch (error) {
          console.log(error)
        }
      },
    ],
    // PowerBIが表示される時
    [
      'rendered',
      async () => {
        console.log('Report has rendered')
      },
    ],
    // PowerBIのエラーが発生する時
    [
      'error',
      (event?: service.ICustomEvent<any>) => {
        if (event) {
          console.error(event.detail)
        }
      },
    ],
    // detaを選択される時
    [
      'dataSelected',
      async (event: any) => {
        // Slicerのstateを保管する(slicerの中にフィルターがある)
        console.log('dataSelected')

        //確認用↓↓↓
        try {
          const pages = await reportRef.current!.getPages()
          const activePage = pages?.filter(function (page) {
            return page.isActive
          })[0]

          if (!activePage) return

          const visuals = await activePage.getVisuals()
          const slicers = visuals.filter((visual) => {
            return visual.type === 'slicer'
          })
          // 現在のslicerのステートを[]にする
          slicerState.current = []
          // 取得したslicerのステートを保管する
          slicers.forEach(async (slicer) => {
            const state = await slicer.getSlicerState()
            console.log('dataSelected時値直接セット')
            // const state: models.ISlicerState = {
            //   filters: [
            //     {
            //       //年
            //       $schema: "http://powerbi.com/product/schema#basic",
            //       filterType: 1,
            //       operator: "In",
            //       requireSingleSelection: true,
            //       // target: {column: 'year', table: 'date'},
            //       target: { column: "年", table: "date" },
            //       values: ["2021"]
            //     },
            //     // {
            //     //   //月
            //     //   $schema: 'http://powerbi.com/product/schema#basic',
            //     //   filterType: 1,
            //     //   operator: 'In',
            //     //   requireSingleSelection: true,
            //     //   target: { column: 'month', table: 'date' },
            //     //   values: ['10']
            //     // },
            //   ],
            //   targets: [
            //     { column: "year", table: "date" },
            //   ]
            // }
            slicerState.current = [...slicerState.current, state]
          })
        } catch (errors) {
          console.log(errors)
        }
      },
    ],
    // ボタンがクリックされる時
    [
      'buttonClicked',
      (event: any) => {
        // ボタンをクリックした時に、ボタンのtitleを取得できる
        // titleは「トラクタ課/トップ/S」という形に設定されている

        //　titleを取得「トラクタ課/トップ/S」
        const destinationTitle = event.detail.title
        //　titleを分解する["トラクタ課","トップ","S"]
        const destinationTitleExplode = destinationTitle.split('/')

        // 外だしJSONファイルにPowerBIのembedUrlを検索する
        // メインメニューを検索(工場全体やトラクタ課など)
        const menu = menus.find(
          (menu) => menu.title === destinationTitleExplode[0]
        )
        if (menu === undefined) return
        //　メインメニューの中のサブメニューを検索(トップやMARなど)
        const subMenu = menu.subMenu.find(
          (subMenu: any) => subMenu.title === destinationTitleExplode[1]
        )
        if (subMenu === undefined) return
        //　もっと細かくメニューを検索(SやQやMcなど)
        const detail = subMenu.details.find(
          (subMenu: any) => subMenu.title === destinationTitleExplode[2]
        )

        // 表示させるPowerBI情報を設定する
        setCurrentMenu({
          mainTitle: menu.title,
          subMenuTitle: subMenu.title,
          subMenuEmbedUrl: subMenu.embedUrl,
          subMenuDateSlicerType: subMenu.dateSlicerType, //subMenu日付スライサー種別
          detailTitle: detail ? detail.title : undefined,
          detailEmbedUrl: detail ? detail.embedUrl : undefined,
          detailsDateSlicerType: detail ? detail.dateSlicerType : undefined, //details日付スライサー種別
          underMenu: undefined,
          underMenuTitle: undefined,
          underMenuEmbedUrl: undefined,
          noMenuFlag: subMenu.noMenuFlag ? subMenu.noMenuFlag : false
        })
      },
    ],
  ])

  // トークンを取得するため認証を行う関数(検証できないので、サンプルのまま実装)
  const authenticate = () => {
    console.log('Auth')
    const msalConfig = {
      auth: {
        clientId: clientId,
      },
    }

    const loginRequest = {
      scopes: scopes,
    }

    const msalInstance: UserAgentApplication = new UserAgentApplication(
      msalConfig
    )

    const successCallback = (response: AuthResponse) => {
      console.log('success', response)
      if (response.tokenType === 'id_token') {
        authenticate()
      } else if (response.tokenType === 'access_token') {
        accessToken.current = response.accessToken

        // Refresh User Permissions
        tryRefreshUserPermissions()
        // getembedUrl(config.reportId)
        setReportConfig({
          ...reportConfig,
          accessToken: response.accessToken,
          embedUrl: currentMenu?.subMenuEmbedUrl,
        })
      } else {
        console.log('Token type is: ' + response.tokenType)
      }
    }

    const failCallBack = (error: AuthError) => {
      console.log('Authentication was fail', error)
    }

    msalInstance.handleRedirectCallback(successCallback, failCallBack)

    // check if there is a cached user
    if (msalInstance.getAccount()) {
      // get access token silently from cached id-token
      msalInstance
        .acquireTokenSilent(loginRequest)
        .then((response: AuthResponse) => {
          // get access token from response: response.accessToken
          accessToken.current = response.accessToken
          // getembedUrl(config.reportId)
          setReportConfig({
            ...reportConfig,
            accessToken: response.accessToken,
            embedUrl: currentMenu?.subMenuEmbedUrl,
          })
        })
        .catch((err: AuthError) => {
          // refresh access token silently from cached id-token
          // makes the call to handleredirectcallback
          if (err.name === 'InteractionRequiredAuthError') {
            msalInstance.acquireTokenRedirect(loginRequest)
          } else {
            console.log('Authentication was fail', err)
          }
        })
    } else {
      // user is not logged in or cached, you will need to log them in to acquire a token
      msalInstance.loginRedirect(loginRequest)
    }
  }

  // 再認証を行う関数(検証できないので、サンプルのまま実装)
  const tryRefreshUserPermissions = () => {
    fetch('https://api.powerbi.com/v1.0/myorg/RefreshUserPermissions', {
      headers: {
        Authorization: 'Bearer ' + accessToken.current,
      },
      method: 'POST',
    })
      .then(function (response) {
        if (response.ok) {
          console.log('User permissions refreshed successfully.')
        } else {
          // Too many requests in one hour will cause the API to fail
          if (response.status === 429) {
            console.error(
              'Permissions refresh will be available in up to an hour.'
            )
          } else {
            console.error(response)
          }
        }
      })
      .catch(function (error) {
        console.error('Failure in making API call.' + error)
      })
  }

  useEffect(() => {
    console.log('初期表示')
    // クボタ様を渡す時に、authenticate()を行うため、コメントを戻す
    // authenticate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (accessToken.current === undefined) return
    // PowerBIを切り替える時に、ブックマークをクリアする
    setCurrentBookmark(undefined)
    //　切り替える先のPowerBIを判断
    //　currentMenuにdetailメニューの情報がある場合にdetail(S,Q,Mcなど)のPowerBIを表示するわけ
    //　currentMenuにdetailメニューの情報がない場合にsuvMenuのPowerBIを表示するわけ
    let embedUrl = undefined
    if (currentMenu.underMenuEmbedUrl) {
      embedUrl = currentMenu.underMenuEmbedUrl
    } else if (currentMenu.detailEmbedUrl) {
      embedUrl = currentMenu.detailEmbedUrl
    } else {
      embedUrl = currentMenu.subMenuEmbedUrl
    }
    //　レポートの設定を設定する
    setReportConfig({
      ...reportConfig,
      accessToken: accessToken.current,
      embedUrl: embedUrl,
      //ここにfilters
      filters: [
        {
          //年
          $schema: "http://powerbi.com/product/schema#basic",
          filterType: models.FilterType.Basic,
          operator: "In",
          requireSingleSelection: true,
          target: { column: "yyyy/mm", table: "日付マスタ" },
          values: ["2021/5"]
        },
      ]
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMenu])

  // ブックマークを選択時
  const HandleChangeBookmark = async (item: models.IReportBookmark) => {
    if (reportRef.current === undefined) return
    try {
      await reportRef.current.bookmarksManager.apply(item.name)
      setCurrentBookmark(item)
    } catch (errors) {
      console.log(errors)
    }
  }

  // 「S」「Q」「C」などを選択時
  const HandleChangeDetail = (detail: Detail) => {
    if (detail.underMenu) {
      setCurrentMenu({
        ...currentMenu,
        detailTitle: detail.title,
        underMenu: detail.underMenu,
        //subMenuDateSlicerType: undefined, //subMenu日付スライサー種別追加 【要調査】
        //detailsDateSlicerType: undefined //details日付スライサー種別追加 【要調査】
      })
    } else if (detail.anotherTabFlag) {
      window.open(detail.embedUrl, '_blank');
    } else {
      setCurrentMenu({
        ...currentMenu,
        detailTitle: detail.title,
        detailEmbedUrl: detail.embedUrl,
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        detailsDateSlicerType: detail.dateSlicerType //details日付スライサー種別追加
      })
    }
  }

  // 最下層メニューを取得
  const HandleChangeUnder = (under: Under) => {
    setCurrentMenu({
      ...currentMenu,
      underMenuTitle: under.title,
      underMenuEmbedUrl: under.embedUrl,
      //subMenuDateSlicerType: undefined, //subMenu日付スライサー種別追加 【要調査】
      //detailsDateSlicerType: undefined //details日付スライサー種別追加 【要調査】
    })
  }

  // バックボタン押下時
  const handleBack = () => {
    // 最下層メニューのPowerBIを表示している間にバックボタンを押下
    if (
      currentMenu.underMenuTitle !== undefined &&
      currentMenu.underMenuEmbedUrl !== undefined
    ) {
      // detailのPowerBIの情報を削除する（underとdetailの情報を削除し、subMenuのPowerBiを表示）
      setCurrentMenu({
        ...currentMenu,
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        detailsDateSlicerType: undefined, //detail日付スライサー種別削除
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined
      })
      return
    }

    // detailのPowerBIを表示している間、バックボタンを押下
    if (
      currentMenu.detailTitle !== undefined &&
      currentMenu.detailEmbedUrl !== undefined
    ) {
      // detailのPowerBIの情報を削除する（detailの情報がないと勝手に、subMenuのPowerBiを表示）
      setCurrentMenu({
        ...currentMenu,
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        detailsDateSlicerType: undefined, //detail日付スライサー種別削除
      })
      return
    }

    // subMenu(トップの場合)のPowerBIを表示している間に、バックボタンを押下
    if (
      currentMenu.mainTitle !== OVERALL_REPORT_NAME &&
      currentMenu.subMenuTitle === TOP_REPORT_NAME
    ) {
      //　工場全体に画面遷移するため、工場全体のPowerBIの情報を検索
      const overallReport = menus
        .find((menu) => menu.title === OVERALL_REPORT_NAME)
        ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
      setCurrentMenu({
        mainTitle: OVERALL_REPORT_NAME,
        subMenuTitle: overallReport?.title,
        subMenuEmbedUrl: overallReport?.embedUrl,
        subMenuDateSlicerType: overallReport?.dateSlicerType, //追加:subMenu日付スライサー種別
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        detailsDateSlicerType: undefined, //追加:details日付スライサー種別
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: overallReport?.noMenuFlag ? overallReport?.noMenuFlag : false
      })
      return
    }

    // 検査課などをスキップ
    if (
      currentMenu.mainTitle !== OVERALL_REPORT_NAME &&
      !currentMenu.noMenuFlag
    ) {
      //　工場全体に画面遷移するため、工場全体のPowerBIの情報を検索
      const overallReport = menus
        .find((menu) => menu.title === OVERALL_REPORT_NAME)
        ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
      setCurrentMenu({
        mainTitle: OVERALL_REPORT_NAME,
        subMenuTitle: overallReport?.title,
        subMenuEmbedUrl: overallReport?.embedUrl,
        subMenuDateSlicerType: overallReport?.dateSlicerType, //追加:subMenu日付スライサー種別
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        detailsDateSlicerType: undefined, //追加:details日付スライサー種別
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: overallReport?.noMenuFlag ? overallReport?.noMenuFlag : false
      })
      return
    }

    // subMenu(トップ以外)のPowerBIを表示している間に、バックボタンを押下
    if (
      currentMenu.mainTitle !== OVERALL_REPORT_NAME &&
      currentMenu.subMenuTitle !== TOP_REPORT_NAME
    ) {
      //　課のトップに画面遷移するため、課のトップのPowerBIの情報を検索
      const topReport = menus
        .find((menu) => menu.title === currentMenu.mainTitle)
        ?.subMenu.find((subMenu) => subMenu.title === TOP_REPORT_NAME)
      setCurrentMenu({
        mainTitle: currentMenu.mainTitle,
        subMenuTitle: topReport?.title,
        subMenuEmbedUrl: topReport?.embedUrl,
        subMenuDateSlicerType: topReport?.dateSlicerType, //追加:subMenu日付スライサー種別
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        detailsDateSlicerType: undefined, //追加:details日付スライサー種別
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: topReport?.noMenuFlag ? topReport?.noMenuFlag : false
      })
      return
    }
  }

  // DataPicker切替
  const CheckSlicerType = (subMenuDateSlicerType: string | undefined, detailsDateSlicerType: string | undefined, underMenu: Under[] | undefined) => {

    if (detailsDateSlicerType === undefined && underMenu === undefined)
      //年のパターン
      if (subMenuDateSlicerType === 'year')
        return <YearPickerCalendar />

      //年月のパターン
      else if (subMenuDateSlicerType === 'month')
        return <MonthPickerCalendar />

      //週のパターン
      else if (subMenuDateSlicerType === 'week')
        return <WeekPickerCalendar />

      //日付のパターン
      else if (subMenuDateSlicerType === 'day')
        return <DayPickerCalendar />

      //その他('none'含め)
      else return

    else if (underMenu === undefined)
      //年のパターン
      if (detailsDateSlicerType === 'year')
        return <YearPickerCalendar />

      //年月のパターン
      else if (detailsDateSlicerType === 'month')
        return <MonthPickerCalendar />

      //週のパターン
      else if (detailsDateSlicerType === 'week')
        return <WeekPickerCalendar />

      //日付のパターン
      else if (detailsDateSlicerType === 'day')
        return <DayPickerCalendar />

      //その他('none'含め)
      else return

    else return
  }

  return (
    <Box sx={styles.root} display="flex">
      <Collapse in={isOpenMenu} orientation="horizontal" sx={styles.collapseRoot}>
        <MenuBar
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
          reportConfig={reportConfig}
          setReportConfig={setReportConfig}
        />
      </Collapse>
      <Box sx={styles.contentContainer}>
        <Header
          setIsOpenMenu={setIsOpenMenu}
          isOpenMenu={isOpenMenu}
          currentMenu={currentMenu}
          setCurrentMenu={setCurrentMenu}
        />
        <Box display="flex" sx={styles.btnList}>
          <Box style={styles.topBtn}>
            {!isMainPage && (
              <Box
                sx={styles.backBtn}
                mr={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                onClick={handleBack}
              >
                <SvgIcon
                  //component={arrowLeftIcon}
                  sx={{ width: 'auto', height: 'auto' }}
                  width="18"
                  height="15.43"
                  viewBox="0 0 18 15.428"
                />
              </Box>
            )}
          </Box>
          <Box py={4} sx={styles.btnMenu}>
            <Box
              display="flex"
              sx={styles.bookmarksContainer}
              mr={bookmarks && bookmarks.length > 0 ? 4 : 0}
            >
              {bookmarks &&
                bookmarks.map((item) => {
                  if (item === null) return <Box />
                  const display = item.displayName.match(/\(([^)]*)\)/)![1]
                  return (
                    <Box
                      sx={{
                        ...styles.btn,
                        ...(currentBookmark?.displayName === item.displayName
                          ? styles.clickedBtn
                          : {}),
                      }}
                      key={item.displayName}
                      onClick={() => {
                        HandleChangeBookmark(item)
                      }}
                    >
                      {display}
                    </Box>
                  )
                })}
            </Box>
            <Box display="flex" justifyContent='space-between'>
              <Box display="flex" sx={styles.bookmarksContainer}>
                {menus
                  .find((menu) => menu.title === currentMenu.mainTitle)
                  ?.subMenu.find(
                    (subMenu) => subMenu.title === currentMenu.subMenuTitle
                  )
                  ?.details.map((detial) => {
                    return (
                      <Box
                        sx={{
                          ...styles.btn,
                          ...(currentMenu.detailTitle === detial.title
                            ? styles.clickedBtn
                            : {}),
                          minWidth: 44,
                        }}
                        key={detial.title}
                        onClick={(e) => {
                          HandleChangeDetail(detial)
                          if (detial.underMenu) {
                            handleClick(e, detial.title)
                          }
                        }}
                      >
                        {detial.title}
                      </Box>
                    )
                  })}
                <MuiMenu
                  anchorEl={anchorEl}
                  id="sub-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  sx={styles.subMenu}
                  PaperProps={{
                    elevation: 0,
                    sx: styles.subMenuPaper,
                  }}
                  transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 0, vertical: 70 }}
                >
                  {menus
                    .find((menu) => menu.title === currentMenu.mainTitle)
                    ?.subMenu.find(
                      (subMenu) => subMenu.title === currentMenu.subMenuTitle
                    )
                    ?.details.find(
                      (detial) => detial.title === currentMenu.detailTitle
                    )
                    ?.underMenu?.map((under) => (
                      <MenuItem
                        key={under.title}
                        onClick={(e) => HandleChangeUnder(under)}
                      >{under.title}</MenuItem>
                    ))}
                </MuiMenu>
              </Box>

              {/* DataPicker */}
              {CheckSlicerType(currentMenu.subMenuDateSlicerType, currentMenu.detailsDateSlicerType, currentMenu.underMenu)}

            </Box>


          </Box>
        </Box>
        <Box component={Paper} p={2} sx={styles.powerbiContainer}>
          <PowerBIEmbed
            embedConfig={reportConfig}
            eventHandlers={eventHandlersMap}
            cssClassName={'report-style-class'}
            getEmbeddedComponent={(embedObject: Embed) => {
              // console.log(
              //   `Embedded object of type "${embedObject.embedtype}" received`,
              //   embedObject
              // )
              reportRef.current = embedObject as Report
            }}
          />
        </Box>
      </Box>
    </Box>

  )
}