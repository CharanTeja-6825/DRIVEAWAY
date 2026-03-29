import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Slide,
} from '@mui/material';
import CookieIcon from '@mui/icons-material/Cookie';
import CloseIcon from '@mui/icons-material/Close';

const CONSENT_KEY = 'driveaway_cookie_consent';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      // Delay slightly so page renders first
      const timer = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit timeout={350}>
      <Box
        role="dialog"
        aria-modal="false"
        aria-label="Cookie consent"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1400,
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 2, sm: 2.5 },
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'grey.200',
          boxShadow: '0px -4px 24px rgba(15, 23, 42, 0.10)',
        }}
      >
        <Box
          sx={{
            maxWidth: 960,
            mx: 'auto',
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 1.5, sm: 2 },
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          {/* Icon + Text */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              flex: 1,
            }}
          >
            <CookieIcon
              sx={{
                color: 'primary.main',
                fontSize: { xs: 28, sm: 32 },
                mt: { xs: 0.25, sm: 0 },
                flexShrink: 0,
              }}
            />
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  fontFamily: '"Sora", sans-serif',
                  fontWeight: 600,
                  color: 'text.primary',
                  lineHeight: 1.4,
                  mb: 0.5,
                }}
              >
                We use cookies 🍪
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.6,
                  maxWidth: 600,
                }}
              >
                DriveAway uses cookies to keep you signed in and make the app work
                seamlessly — especially on mobile, where browsers may block them by
                default. Please allow cookies for the best experience.
              </Typography>
            </Box>
          </Box>

          {/* Action buttons */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{
              flexShrink: 0,
              width: { xs: '100%', sm: 'auto' },
              justifyContent: { xs: 'flex-end', sm: 'flex-start' },
              alignItems: 'center',
            }}
          >
            <Button
              variant="outlined"
              size="small"
              onClick={handleDecline}
              sx={{
                borderRadius: '10px',
                borderColor: 'grey.300',
                color: 'text.secondary',
                fontWeight: 600,
                px: 2.5,
                py: 1,
                '&:hover': {
                  borderColor: 'grey.400',
                  bgcolor: 'grey.50',
                },
              }}
            >
              Decline
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleAccept}
              sx={{
                borderRadius: '10px',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                fontWeight: 600,
                px: 2.5,
                py: 1,
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Accept All
            </Button>
            <IconButton
              size="small"
              onClick={handleDecline}
              aria-label="Close cookie consent"
              sx={{
                color: 'text.disabled',
                '&:hover': { color: 'text.secondary' },
                display: 'flex',
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Slide>
  );
}
