
import React from 'react';
import { 
  Box, 
  Typography, 
  Link, 
  Container, 
  IconButton,
  Stack,
  useTheme
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

// Modern footer with improved design and social links
const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' 
          ? theme.palette.grey[50] 
          : theme.palette.grey[900],
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          {/* Copyright and brand info */}
          <Box>
            <Typography variant="body2" color="text.secondary" align="center">
              © {currentYear}{' '}
              <Link 
                color="inherit" 
                href="https://your-portfolio-url.com/" 
                sx={{ 
                  fontWeight: 600,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline'
                  }
                }}
              >
                PortfolioAnalytics Pro
              </Link>
              {' | '}
              All Rights Reserved.
            </Typography>
            <Typography variant="caption" color="text.secondary" align="center" sx={{ display: 'block', mt: 0.5 }}>
              Advanced portfolio tracking and analytics platform
            </Typography>
          </Box>
          
          {/* Social links */}
          <Stack direction="row" spacing={1}>
            <IconButton 
              size="small" 
              href="https://github.com" 
              target="_blank"
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  color: theme.palette.primary.main,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1)
                }
              }}
            >
              <GitHubIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              href="https://linkedin.com" 
              target="_blank"
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  color: '#0A66C2',
                  backgroundColor: alpha('#0A66C2', 0.1)
                }
              }}
            >
              <LinkedInIcon fontSize="small" />
            </IconButton>
            <IconButton 
              size="small" 
              href="https://twitter.com" 
              target="_blank"
              sx={{ 
                color: 'text.secondary',
                '&:hover': { 
                  color: '#1DA1F2',
                  backgroundColor: alpha('#1DA1F2', 0.1)
                }
              }}
            >
              <TwitterIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
        
        {/* Additional footer info */}
        <Typography 
          variant="caption" 
          color="text.secondary" 
          align="center" 
          sx={{ 
            display: 'block', 
            mt: 2,
            fontSize: '0.75rem'
          }}
        >
          This is a demonstration project for portfolio analytics. Data shown is for illustrative purposes only.
        </Typography>
      </Container>
    </Box>
  );
};

// Helper function for alpha colors (if not using MUI v5)
function alpha(color, value) {
  return color;
}

export default Footer;
