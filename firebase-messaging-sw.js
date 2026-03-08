// firebase-messaging-sw.js - Service Worker untuk Push Notification

// Handle background messages
self.addEventListener('push', function(event) {
  console.log('[Push Event] Received push event:', event);

  let data = {};
  
  // Try to parse data from the event
  if (event.data) {
    try {
      data = event.data.json();
      console.log('[Push Event] Parsed data:', data);
    } catch (e) {
      console.log('[Push Event] Could not parse data:', e);
      // Try as text
      data = { body: event.data.text() };
    }
  }

  // Extract notification data - support both data and notification formats
  const title = data.notification?.title || data.title || data.data?.title || '📝 Tugas Baru!';
  const body = data.notification?.body || data.body || data.data?.body || 'Admin telah menambahkan tugas baru';
  const icon = data.icon || 'https://i.ibb.co/7xxVWwH7/IMG-8428.png';

  const options = {
    body: body,
    icon: icon,
    badge: 'https://i.ibb.co/7xxVWwH7/IMG-8428.png',
    tag: 'tugas-notification',
    requireInteraction: true,
    vibrate: [200, 100, 200],
    data: {
      url: data.url || '/dashboard.html',
      timestamp: Date.now()
    }
  };

  console.log('[Push Event] Showing notification:', title, body);

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', function(event) {
  console.log('[Notification Click] User clicked notification');
  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(function(clientList) {
        // Check if there's already a window open
        for (const client of clientList) {
          if (client.url.includes('dashboard.html') && 'focus' in client) {
            return client.focus();
          }
        }

        // Open new window if none found
        if (clients.openWindow) {
          return clients.openWindow('/dashboard.html');
        }
      })
      .catch(function(err) {
        console.error('[Notification Click] Error:', err);
      })
  );
});

// Handle notification close
self.addEventListener('notificationclose', function(event) {
  console.log('[Notification Close] User closed notification');
});

// Handle messages from the main app
self.addEventListener('message', function(event) {
  console.log('[SW Message] Received message from app:', event.data);
  
  if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    const { title, body } = event.data;
    self.registration.showNotification(title, {
      body: body,
      icon: 'https://i.ibb.co/7xxVWwH7/IMG-8428.png',
      tag: 'tugas-notification'
    });
  }
});
