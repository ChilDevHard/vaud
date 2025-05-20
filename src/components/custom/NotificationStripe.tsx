import { t } from '@/lib/i18n'

const notificationStripe = await t('notification_stripe', 'fr')

export default function NotificationStripe() {
  return (
    <div className="w-full bg-gray-300 text-gray-800 text-center text-sm py-1">
      {notificationStripe}
    </div>
  )
}
