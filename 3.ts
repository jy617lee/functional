
interface Subscriber {
  email: string,
  rec_count: number
}

interface Coupon {
  code: string,
  rank: COUPON_RANK
}

enum COUPON_RANK {
  BAD = 'BAD',
  GOOD = 'GOOD', 
  BEST = 'BEST'
}

interface Email {
  from: string, 
  to: string,
  subject: string
  body: string
}

const EMAIL_CONTENTS: {[key in COUPON_RANK]?: { subject: string, body: string }} = {
  GOOD: {
    subject: 'good subject',
    body: 'good body'
  },
  BEST: {
    subject: 'best subject',
    body: 'best body'
  }
}

const COMPANY_EMAIL = 'company@email.com'

// 계산
const getCouponRank = (recCount: number): COUPON_RANK => {
  if (recCount >= 10) return COUPON_RANK.BEST
  if (recCount > 0) return COUPON_RANK.GOOD
  return COUPON_RANK.BAD
}

const getCouponByRank = (coupons: Coupon[], rank: COUPON_RANK) => {
  return coupons.filter(item => item.rank === rank)
}

// 액션
const getEmailForSubscriber = (subscriber: Subscriber, coupons: Coupon[]): Email => {
  const rank = getCouponRank(subscriber.rec_count)
  const couponsForSubscriber = getCouponByRank(coupons, rank)
  return {
    from: COMPANY_EMAIL,
    to: subscriber.email,
    subject: `Your weekly ${rank} coupon`,
    body: `Here are ${rank} coupons: ${couponsForSubscriber.join(', ')}`
  }
}