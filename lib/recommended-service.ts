import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'

export const getRecommended = async () => {
  let userId

  try {
    const self = await getSelf()
    userId = self.id
  } catch (error) {
    userId = null
  }

  let users = []

  if (userId) {
    users = await db.user.findMany({
      where: {
        AND: [
          {
            // not the user self
            NOT: {
              id: userId
            }
          },
          {
            // not the followed users
            NOT: {
              followedBy: {
                some: {
                  followerId: userId
                }
              }
            }
          },
          {
            // not the blocked users
            NOT: {
              blocking: {
                some: {
                  blockedId: userId
                }
              }
            }
          }
        ],
      },
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  } else {
    users = await db.user.findMany({
      include: {
        stream: {
          select: {
            isLive: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  return users
}
