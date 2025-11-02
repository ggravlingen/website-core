import {
  DarkMode,
  GitHub,
  LightMode,
  LinkedIn,
  Menu as MenuIcon,
} from '@mui/icons-material'
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme as useMuiTheme,
} from '@mui/material'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useTheme } from '../hooks/useTheme'

const NavigationBar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isDarkMode, toggleTheme } = useTheme()
  const muiTheme = useMuiTheme()
  const isMdUp = useMediaQuery(muiTheme.breakpoints.up('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
  }

  const handleLinkedInClick = () => {
    window.open(
      'https://www.linkedin.com/in/patriklindgren/',
      '_blank',
      'noopener,noreferrer'
    )
  }

  const handleGitHubClick = () => {
    window.open(
      'https://github.com/ggravlingen/',
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            color="inherit"
            onClick={() => handleNavigation('/')}
            sx={{ fontWeight: 700, textTransform: 'none' }}
          >
            Regutch Partners
          </Button>
          {/* Show hamburger on small screens */}
          {!isMdUp && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer(true)}
              aria-label="Open navigation menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          {/* Desktop nav buttons */}
          {isMdUp && (
            <>
              <Button
                color="inherit"
                onClick={() => handleNavigation('/')}
                variant={location.pathname === '/' ? 'outlined' : 'text'}
              >
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation('/open-source-projects')}
                variant={
                  location.pathname === '/open-source-projects'
                    ? 'outlined'
                    : 'text'
                }
              >
                Open Source Projects
              </Button>
            </>
          )}
        </Box>

        {isMdUp && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IconButton
              color="inherit"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              title={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              {isDarkMode ? <LightMode /> : <DarkMode />}
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleGitHubClick}
              aria-label="GitHub"
              title="GitHub"
            >
              <GitHub />
            </IconButton>
            <IconButton
              color="inherit"
              onClick={handleLinkedInClick}
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <LinkedIn />
            </IconButton>
          </Box>
        )}
      </Toolbar>

      {/* Mobile drawer */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
        >
          <List>
            <ListItemButton onClick={() => handleNavigation('/')}>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handleNavigation('/open-source-projects')}
            >
              <ListItemText primary="Open Source Projects" />
            </ListItemButton>
          </List>
          <Divider />
          <List>
            <ListItemButton
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              title={
                isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
              }
            >
              <ListItemIcon>
                {isDarkMode ? <LightMode /> : <DarkMode />}
              </ListItemIcon>
              <ListItemText
                primary={
                  isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'
                }
              />
            </ListItemButton>
            <ListItemButton onClick={handleGitHubClick}>
              <ListItemIcon>
                <GitHub />
              </ListItemIcon>
              <ListItemText primary="GitHub" />
            </ListItemButton>
            <ListItemButton onClick={handleLinkedInClick}>
              <ListItemIcon>
                <LinkedIn />
              </ListItemIcon>
              <ListItemText primary="LinkedIn" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default NavigationBar
