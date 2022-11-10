import { Box, Typography, SvgIcon } from '@mui/material'
import { FC, useState } from 'react'
import { Theme, Menu as MuiMenu, MenuItem } from '@mui/material'
import { menus, SubMenu } from '../menuConfig'
import { ReactComponent as Logo } from '../assets/icons/logo_kubota.svg'
import { ReactComponent as MenuIcon } from '../assets/icons/menu_green.svg'
import { models } from 'powerbi-client'
import { CurrentMenu } from '../Tims'

const styles = {
  root: {
    width: 210,
    minWidth: 210,
    height: '100vh',
    backgroundColor: (theme: Theme) => theme.colors.white,
  },
  menu: {
    display: 'flex',
    justifyContents: 'center',
    alignItems: 'center',
    height: 48,
    pl: 7.5,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: (theme: Theme) => theme.colors.lightGreen,
    },
  },
  selectedMenu: {
    backgroundColor: (theme: Theme) => theme.colors.lightGreen,
  },
  logoContainer: {
    padding: '18px 15px 17px 24px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  hamburgerIcon: {
    cursor: 'pointer',
    width: 'auto',
    height: 'auto',
  },
  subMenu: {
    transform: 'translate(-70px, -21.5px)',
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
      top: 40,
      left: -10,
      width: 20,
      height: 20,
      bgcolor: '#d8efef',
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  },
}

type Props = {
  isOpenMenu: boolean
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>
  currentMenu: CurrentMenu
  setCurrentMenu: React.Dispatch<React.SetStateAction<CurrentMenu>>
  reportConfig: models.IReportEmbedConfiguration
  setReportConfig: React.Dispatch<
    React.SetStateAction<models.IReportEmbedConfiguration>
  >
}

export const MenuBar: FC<Props> = ({
  isOpenMenu,
  setIsOpenMenu,
  currentMenu,
  setCurrentMenu,
}) => {
  const [clickedMenu, setClickedMenu] = useState<string>('')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    mainTitle: string
  ) => {
    setClickedMenu(mainTitle)
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setClickedMenu('')
    setAnchorEl(null)
  }

  const handleClickMenu = (menu: string, noMenuFlag: boolean, subMenu: SubMenu) => {
    setIsOpenMenu(false)
    if (subMenu.anotherTabFlag) {
      window.open(subMenu.embedUrl, '_blank');
    } else if (noMenuFlag && menu !== '工場全体') {
      setCurrentMenu({
        mainTitle: menu,
        subMenuTitle: subMenu.details[0].title,
        subMenuEmbedUrl: subMenu.details[0].embedUrl,
        subMenuDateSlicerType: subMenu.details[0].dateSlicerType, //subMenu日付スライサー種別
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        detailsDateSlicerType: undefined, //details日付スライサー種別
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: noMenuFlag
      })
    } else {
      setCurrentMenu({
        mainTitle: menu,
        subMenuTitle: subMenu.title,
        subMenuEmbedUrl: subMenu.embedUrl,
        subMenuDateSlicerType: subMenu.dateSlicerType, //subMenu日付スライサー種別
        detailTitle: undefined,
        detailEmbedUrl: undefined,
        detailsDateSlicerType: undefined, //details日付スライサー種別
        underMenu: undefined,
        underMenuTitle: undefined,
        underMenuEmbedUrl: undefined,
        noMenuFlag: noMenuFlag
      })
    }
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.logoContainer}>
        <Box>
          <Box>
            <SvgIcon
              component={Logo}
              sx={{ width: 'auto', height: 'auto' }}
              width="90"
              height="21.279"
              viewBox="0 0 90 21.279"
            />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              color={(theme) => theme.colors.middleGreen}
            >
              筑波工場
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <SvgIcon
            component={MenuIcon}
            sx={styles.hamburgerIcon}
            width="18"
            height="14"
            viewBox="0 0 18 14"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          />
        </Box>
      </Box>
      {menus.map((menu) => (
        <Box
          key={menu.title}
          sx={{
            ...styles.menu,
            ...(currentMenu.mainTitle === menu.title && styles.selectedMenu),
          }}
          onClick={(e) => {
            if (menu.title === '工場全体') {
              const link = menus
                .find((menu) => menu.title === '工場全体')
                ?.subMenu.find(
                  (subMenu) => subMenu.title === 'トップ'
                )!.embedUrl
                const picker = menus
                .find((menu) => menu.title === '工場全体')
                ?.subMenu.find(
                  (subMenu) => subMenu.title === 'トップ'
                )!.dateSlicerType
              if (link)
                handleClickMenu('工場全体', true, {
                  title: 'トップ', 
                  embedUrl: link,
                  dateSlicerType: picker,
                  anotherTabFlag: menu.anotherTabFlag,
                  details: [],
                })
              return
            } else if (menu.noMenuFlag) {
              const link = menu.subMenu.find(
                  (subMenu) => subMenu.title === 'トップ'
                )!.embedUrl
                const picker = menu.subMenu.find(
                  (subMenu) => subMenu.title === 'トップ'
                )!.dateSlicerType
              handleClickMenu(menu.title, menu.noMenuFlag, {
                title: menu.title,
                embedUrl: link,
                dateSlicerType: picker,
                anotherTabFlag: menu.anotherTabFlag,
                details: menu.subMenu,
              })
              return
            } else if (menu.subMenu.length <= 1) { // TODO: 調整
              handleClick(e, menu.title)
            }
            handleClick(e, menu.title)
          }}
          aria-controls={open ? 'sub-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <Typography variant="body2">{menu.title}</Typography>
        </Box>
      ))}
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
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {menus
          .find((menu) => menu.title === clickedMenu)
          ?.subMenu.map((subMenu) => (
            <MenuItem
              key={subMenu.title}
              onClick={() => handleClickMenu(clickedMenu, false, subMenu)}
            >
              {subMenu.title}
            </MenuItem>
          ))}
      </MuiMenu>
    </Box>
  )
}
