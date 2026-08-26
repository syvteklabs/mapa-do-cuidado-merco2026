# Quick Operation Guide - Merco Noroeste 2026

## For Event Staff

### URLs to Use During Event

**Main Flow:**
- **Home/Info**: https://seu-dominio.com (start here)
- **Participation**: https://seu-dominio.com/participar (form flow)
- **Dashboard**: https://seu-dominio.com/mapa (live stats, TV display)
- **Expansion**: https://seu-dominio.com/expansao (if outside region)

### Setup at Venue

#### 1. Desktop/Tablet Station (Registration Booth)

- Open https://seu-dominio.com/participar
- Keep in "Participação" step
- After user completes: they see "Nova Participação" button to restart
- Dashboard tab open in another window to verify submissions arriving

#### 2. TV Display (Statistics Screen)

- Open https://seu-dominio.com/mapa in full-screen mode
- Updates automatically every 30 seconds
- Shows:
  - Total participations
  - Cities breakdown
  - Top 3 municipalities
  - Category distribution
  - Expansion interests

#### 3. Mobile/Kiosk (Self-Service)

- QR code links to: https://seu-dominio.com/participar
- Responsive design works on phones/tablets
- No installation needed

### During Event - What to Monitor

#### Dashboard Stats

- **Total count increases** = submissions working ✓
- **City list updates** = new responses arriving ✓
- **No personal names visible** = privacy working ✓

#### Error Scenarios

**If dashboard shows "MODO DEMONSTRAÇÃO":**
- Supabase connection lost
- Falling back to demo data (247 fictional responses)
- Try refreshing page
- Check internet connection
- See staff troubleshooting below

**If form submission fails:**
- Error modal appears
- "Tentar Novamente" button lets user retry
- Data saved automatically to device
- No data loss

#### Participation Flow Steps

1. **Welcome screen** - "Começar" button
2. **Info screen** - explain survey
3. **Location screen** - RJ selected by default, pick municipality
4. **Question screen** - select one category
5. **Confirmation** - shows participation number
6. **Options** - "Ver minha cidade" or "Nova Participação"

### Keyboard Shortcuts / Tips

**Browser:**
- `F12` = Open DevTools to check errors
- `Ctrl+Shift+Delete` = Clear browser cache (if needed)
- `F11` = Full-screen mode (good for TV display)

**Form:**
- Tab key = navigate between fields
- Enter = submit (when enabled)
- Mobile: swipe/scroll naturally

### Common Fixes

**Dashboard not updating?**
1. Refresh page (Ctrl+R)
2. Check internet connection
3. If shows "MODO DEMONSTRAÇÃO" = server unavailable (normal, using demo)

**Form won't submit?**
1. Check all fields are filled
2. "Tentar Novamente" button appears if error
3. Check browser console (F12) for red errors

**Numbers look wrong?**
1. Check if "MODO DEMONSTRAÇÃO" is showing (demo data)
2. Refresh page to reload fresh data
3. Stats update every 30 seconds automatically

**Participant can't select their municipality?**
1. Make sure "Estado" is set to "RJ"
2. Try refreshing page
3. Try different browser if persistent

### Support During Event

**Quick Checks:**
1. Network working? (open google.com in new tab)
2. Correct URL? (ends with /participar or /mapa)
3. Browser updated? (Chrome/Firefox/Safari latest)
4. Cache clear? (Ctrl+Shift+Delete in browser)

**Emergency Fallback:**
- System switches to demo mode automatically
- Dashboard still shows numbers (fictional ones)
- Yellow banner indicates demo mode
- Forms still work - data saved to device
- Recovery automatic when connection restored

**Data Safety:**
- All responses saved to device storage
- No data lost during connection issues
- Auto-retry when connection returns
- No need for manual data entry

### End of Event

**To Save Final Statistics:**

1. Open dashboard: https://seu-dominio.com/mapa
2. Screenshot or screen record for documentation
3. Or contact dev team for data export

**Cleaning Up:**

Devices used:
- No cleanup needed
- Clear browser cache if reusing: Ctrl+Shift+Delete
- Close all tabs related to form

Database:
- Automatic - no manual backup needed
- All data safe in Supabase
- Contact dev if export needed

### Important Notes

⚠️ **Privacy:**
- Only city/state recorded for contributions
- No personal information visible on dashboard
- Expansion form keeps contact info confidential
- No phone numbers or names shown publicly

⚠️ **Demo Mode:**
- Shows when Supabase unavailable
- Clearly marked with yellow banner
- Demo data: 247 fictional participants
- Real submissions still work offline, sync when back online

✅ **What Works:**
- 100% mobile responsive
- Works without touch (keyboard navigation)
- Works with touch (swipe, tap)
- Works offline (form data saved locally)
- Auto-sync when connection restored
- Real-time dashboard updates

### Tips for Best Experience

1. **Desktop form entry:**
   - Tablet at desk works best (10-12 inch)
   - Keyboard + mouse
   - Staff enters OR user enters themselves

2. **Self-service kiosk:**
   - Phone or tablet on stand
   - QR code at entrance
   - User scans and completes alone

3. **TV statistics display:**
   - Large monitor (32"+) preferred
   - Full screen mode
   - Refresh manually or let auto-update

4. **Backup plan:**
   - If all else fails, demo mode still works
   - Shows numbers to participants
   - Everything syncs when restored
   - No data loss

---

## Contact Information

**Technical Support:** [Dev team contact]  
**Event Coordinator:** [Merco Noroeste contact]  
**Supabase Status:** https://status.supabase.com  

**Version:** 1.0  
**Last Updated:** 2026-08-26
