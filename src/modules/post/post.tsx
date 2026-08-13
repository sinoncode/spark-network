import {
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  Mail,
  Map,
  Heart,
  MessageCircle,
  Repeat2,
  Reply,
  ThumbsUp,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

type User = {
  id: number
  name: string
  username: string
  image: string
}

type Comment = {
  id: number
  user: User
  text: string
  likes: number
  replies?: Comment[]
}

/* =========================================
   STATIC DATA
========================================= */

const post = {
  id: 1,

  image:
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",

  title: "Amazing Weekend Experience",

  description:
    "Had an amazing weekend exploring new places and meeting wonderful people. The experience was completely worth it and I would definitely recommend this place to everyone.",

  date: "13 Aug 2026",

  time: "12:30 PM",

  location: "New Delhi, India",

  author: {
    id: 101,
    name: "John Doe",
    username: "john_doe",

    image:
      "https://i.pravatar.cc/300?img=12",

    phone: "+91 98765 43210",

    email: "john.doe@example.com",

    address:
      "123 Main Street, New Delhi, India",
  },

  likes: 25,

  comments: 12,

  reposts: 8,
}

/* =========================================
   LIKE USERS
========================================= */

const likedUsers: User[] = [
  {
    id: 1,
    name: "Sarah Smith",
    username: "sarah_smith",
    image: "https://i.pravatar.cc/150?img=32",
  },

  {
    id: 2,
    name: "Michael Wilson",
    username: "michael_w",
    image: "https://i.pravatar.cc/150?img=11",
  },

  {
    id: 3,
    name: "Emily Johnson",
    username: "emily_j",
    image: "https://i.pravatar.cc/150?img=47",
  },

  {
    id: 4,
    name: "David Brown",
    username: "david_b",
    image: "https://i.pravatar.cc/150?img=68",
  },

  {
    id: 5,
    name: "Jessica Taylor",
    username: "jessica_t",
    image: "https://i.pravatar.cc/150?img=44",
  },
]

/* =========================================
   REPOST USERS
========================================= */

const repostUsers: User[] = [
  {
    id: 6,
    name: "Robert Miller",
    username: "robert_m",
    image: "https://i.pravatar.cc/150?img=13",
  },

  {
    id: 7,
    name: "Sophia Davis",
    username: "sophia_d",
    image: "https://i.pravatar.cc/150?img=45",
  },

  {
    id: 8,
    name: "Daniel Anderson",
    username: "daniel_a",
    image: "https://i.pravatar.cc/150?img=51",
  },
]

/* =========================================
   COMMENTS
========================================= */

const comments: Comment[] = [
  {
    id: 1,

    user: {
      id: 10,
      name: "Sarah Smith",
      username: "sarah_smith",
      image: "https://i.pravatar.cc/150?img=32",
    },

    text:
      "This looks absolutely amazing! I would love to visit this place.",

    likes: 14,

    replies: [
      {
        id: 11,

        user: {
          id: 101,
          name: "John Doe",
          username: "john_doe",
          image: "https://i.pravatar.cc/150?img=12",
        },

        text:
          "Thank you! You should definitely visit sometime.",

        likes: 6,
      },

      {
        id: 12,

        user: {
          id: 13,
          name: "Michael Wilson",
          username: "michael_w",
          image: "https://i.pravatar.cc/150?img=11",
        },

        text:
          "I completely agree. This place is beautiful.",

        likes: 3,
      },
    ],
  },

  {
    id: 2,

    user: {
      id: 14,
      name: "Emily Johnson",
      username: "emily_j",
      image: "https://i.pravatar.cc/150?img=47",
    },

    text:
      "Great post! Thanks for sharing your experience.",

    likes: 9,

    replies: [],
  },

  {
    id: 3,

    user: {
      id: 15,
      name: "David Brown",
      username: "david_b",
      image: "https://i.pravatar.cc/150?img=68",
    },

    text:
      "Adding this place to my travel list.",

    likes: 5,

    replies: [],
  },
]

/* =========================================
   USER ROW
========================================= */

function UserRow({
  user,
}: {
  user: User
}) {
  return (
    <div
      className="
  flex
  items-center
  gap-3
  rounded-xl
  border
  border-gray-200
  bg-gray-50
  p-3
  transition

  hover:border-[#FC8D0E]/40
  hover:bg-orange-50/40

  dark:border-[#303030]
  dark:bg-[#1d1d1d]
  dark:hover:bg-[#21180f]
"
    >
      <img
        src={user.image}
        alt={user.name}
        className="
          h-11
          w-11
          shrink-0
          rounded-full
          object-cover
        "
      />

      <div className="min-w-0">
        <p
          className="
            truncate
            text-sm
            font-medium
            text-gray-900

            dark:text-white
          "
        >
          {user.name}
        </p>

        <p
          className="
            truncate
            text-xs
            text-gray-500

            dark:text-gray-400
          "
        >
          @{user.username}
        </p>
      </div>
    </div>
  )
}

/* =========================================
   COMMENT
========================================= */

function CommentItem({
  comment,
  reply = false,
}: {
  comment: Comment
  reply?: boolean
}) {
  return (
    <div className={reply ? "ml-10 mt-3 sm:ml-14" : ""}>

      <div
        className="
  rounded-xl
  border
  border-gray-200
  bg-gray-50
  p-4

  dark:border-[#303030]
  dark:bg-[#1d1d1d]
"
      >

        <div className="flex gap-3">

          <img
            src={comment.user.image}
            alt={comment.user.name}
            className="
              h-10
              w-10
              shrink-0
              rounded-full
              object-cover
            "
          />

          <div className="min-w-0 flex-1">

            <div
              className="
                flex
                flex-wrap
                items-center
                gap-x-2
                gap-y-1
              "
            >

              <span
                className="
                  text-sm
                  font-semibold
                  text-gray-900

                  dark:text-white
                "
              >
                {comment.user.name}
              </span>

              <span
                className="
                  text-xs
                  text-gray-500

                  dark:text-gray-400
                "
              >
                @{comment.user.username}
              </span>

            </div>

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-600

                dark:text-gray-300
              "
            >
              {comment.text}
            </p>

            <div
              className="
                mt-3
                flex
                items-center
                gap-4
                text-xs
                text-gray-500

                dark:text-gray-400
              "
            >

              <button
                className="
                  flex
                  items-center
                  gap-1
                  transition
                  hover:text-[#FC8D0E]
                "
              >
                <ThumbsUp size={14} />

                {comment.likes} Likes
              </button>

              <button
                className="
                  flex
                  items-center
                  gap-1
                  transition
                  hover:text-[#FC8D0E]
                "
              >
                <Reply size={14} />

                Reply
              </button>

            </div>

          </div>

        </div>

      </div>

      {/* Replies */}

      {comment.replies &&
        comment.replies.length > 0 && (
          <div>
            {comment.replies.map((replyComment) => (
              <CommentItem
                key={replyComment.id}
                comment={replyComment}
                reply
              />
            ))}
          </div>
        )}

    </div>
  )
}

/* =========================================
   MAIN PAGE
========================================= */

export default function PostPage() {
  return (
    <div
  className="
    min-h-screen
    bg-[#f5f6f8]
    px-3
    py-5
    text-gray-900

    sm:px-5
    sm:py-6

    lg:px-8

    dark:bg-[#0b0b0b]
    dark:text-white
  "
>

      {/* =====================================
          BACKGROUND GLOW
      ====================================== */}

      {/* <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-[#FC8D0E]/10
          blur-3xl

          dark:bg-[#FC8D0E]/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-40
          h-96
          w-96
          rounded-full
          bg-orange-300/10
          blur-3xl

          dark:bg-[#E33210]/10
        "
      /> */}

      <div
        className="
          relative
          mx-auto
          w-full
          max-w-6xl
        "
      >

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="mb-6">

          <h1
            className="
              text-xl
              font-semibold
              tracking-tight

              sm:text-2xl

              dark:text-white
            "
          >
            Post Details
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-gray-500

              dark:text-gray-400
            "
          >
            View post information and activity.
          </p>

        </div>

        {/* =====================================
            FIRST SECTION
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5

            lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.75fr)]
          "
        >

          {/* ===================================
              POST CARD
          ==================================== */}

          <div
  className="
    rounded-2xl
    border
    border-gray-200
    bg-white
    p-4
    shadow-sm

    sm:p-6

    dark:border-[#2d2d2d]
    dark:bg-[#171717]
  "
>

            {/* Post Header */}

            <div
              className="
                flex
                flex-col
                gap-3

                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                "
              >
                <MessageCircle
                  size={18}
                  className="text-[#FC8D0E]"
                />

                Post
              </div>

              <div
                className="
                  flex
                  flex-wrap
                  gap-3
                  text-xs
                  text-gray-500

                  dark:text-gray-400
                "
              >

                <span className="flex items-center gap-1">
                  <CalendarDays size={14} />
                  {post.date}
                </span>

                <span className="flex items-center gap-1">
                  <Clock3 size={14} />
                  {post.time}
                </span>

                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  {post.location}
                </span>

              </div>

            </div>

            {/* Post Image */}

            <div
  className="
    mt-5
    overflow-hidden
    rounded-xl
    border
    border-gray-200
    bg-gray-100

    dark:border-[#303030]
    dark:bg-[#111111]
  "
>

              <img
                src={post.image}
                alt={post.title}
                className="
                  max-h-[430px]
                  w-full
                  object-cover
                "
              />

            </div>

            {/* Title */}

            <h2
              className="
                mt-5
                text-lg
                font-semibold

                sm:text-xl
              "
            >
              {post.title}
            </h2>

            {/* Description */}

            <p
              className="
                mt-2
                text-sm
                leading-6
                text-gray-600

                dark:text-gray-400
              "
            >
              {post.description}
            </p>

          </div>

          {/* ===================================
              USER PROFILE CARD
          ==================================== */}

          <div
  className="
    rounded-2xl
    border
    border-gray-200
    bg-white
    p-5
    shadow-sm

    dark:border-[#2d2d2d]
    dark:bg-[#171717]
  "
>
            <h2 className="text-base font-semibold">
              User Profile
            </h2>

            {/* User */}

            <div className="mt-5 text-center">

              <img
                src={post.author.image}
                alt={post.author.name}
                className="
                  mx-auto
                  h-24
                  w-24
                  rounded-full
                  border-2
                  border-[#FC8D0E]/40
                  object-cover
                  shadow-lg
                "
              />

              <h3 className="mt-3 font-semibold">
                {post.author.name}
              </h3>

              <p
                className="
                  text-xs
                  text-gray-500

                  dark:text-gray-400
                "
              >
                @{post.author.username}
              </p>

            </div>

            {/* Details */}

            <div className="mt-6 space-y-4">

              <div className="flex gap-3">

                <Phone
                  size={17}
                  className="mt-0.5 shrink-0 text-[#FC8D0E]"
                />

                <div>
                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="text-sm dark:text-gray-200">
                    {post.author.phone}
                  </p>
                </div>

              </div>

              <div className="flex gap-3">

                <Mail
                  size={17}
                  className="mt-0.5 shrink-0 text-[#FC8D0E]"
                />

                <div className="min-w-0">

                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p
                    className="
                      truncate
                      text-sm
                      dark:text-gray-200
                    "
                  >
                    {post.author.email}
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <Map
                  size={17}
                  className="mt-0.5 shrink-0 text-[#FC8D0E]"
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Address
                  </p>

                  <p
                    className="
                      text-sm
                      leading-5
                      dark:text-gray-200
                    "
                  >
                    {post.author.address}
                  </p>

                </div>

              </div>

            </div>

            {/* View Profile */}

            <Button
              className="
                mt-6
                w-full
                rounded-xl
                bg-[#FC8D0E]
                text-white
                shadow-md
                shadow-orange-500/10

                hover:bg-[#e77d05]
              "
            >
              View Profile
            </Button>

          </div>

        </div>

        {/* =====================================
            ACTIVITY SECTION
        ====================================== */}

        <div
  className="
    mt-5
    rounded-2xl
    border
    border-gray-200
    bg-white
    p-4
    shadow-sm

    sm:p-6

    dark:border-[#2d2d2d]
    dark:bg-[#171717]
  "
>

          <Tabs defaultValue="likes">

            {/* TAB HEADER */}

            <TabsList
              className="
                grid
                h-auto
                w-full
                grid-cols-3
                gap-1
                rounded-xl
                bg-gray-100/80
                p-1

                dark:bg-white/[0.05]
              "
            >

              <TabsTrigger
                value="likes"
                className="
                  gap-1.5
                  rounded-lg
                  py-2.5
                  text-xs

                  sm:text-sm

                  data-[state=active]:bg-white
                  data-[state=active]:text-[#FC8D0E]
                  data-[state=active]:shadow-sm

                  dark:data-[state=active]:bg-white/10
                "
              >
                <Heart size={15} />

                Likes ({post.likes})
              </TabsTrigger>

              <TabsTrigger
                value="comments"
                className="
                  gap-1.5
                  rounded-lg
                  py-2.5
                  text-xs

                  sm:text-sm

                  data-[state=active]:bg-white
                  data-[state=active]:text-[#FC8D0E]
                  data-[state=active]:shadow-sm

                  dark:data-[state=active]:bg-white/10
                "
              >
                <MessageCircle size={15} />

                Comments ({post.comments})
              </TabsTrigger>

              <TabsTrigger
                value="reposts"
                className="
                  gap-1.5
                  rounded-lg
                  py-2.5
                  text-xs

                  sm:text-sm

                  data-[state=active]:bg-white
                  data-[state=active]:text-[#FC8D0E]
                  data-[state=active]:shadow-sm

                  dark:data-[state=active]:bg-white/10
                "
              >
                <Repeat2 size={15} />

                Reposts ({post.reposts})
              </TabsTrigger>

            </TabsList>

            {/* =================================
                LIKES
            ================================== */}

            <TabsContent
              value="likes"
              className="mt-5"
            >

              <div className="mb-4">

                <h3 className="text-base font-semibold">
                  Liked By
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  Users who liked this post
                </p>

              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                {likedUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                  />
                ))}

              </div>

            </TabsContent>

            {/* =================================
                COMMENTS
            ================================== */}

            <TabsContent
              value="comments"
              className="mt-5"
            >

              <div className="mb-4">

                <h3 className="text-base font-semibold">
                  Comments
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  Comments and replies on this post
                </p>

              </div>

              <div className="space-y-4">

                {comments.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                  />
                ))}

              </div>

            </TabsContent>

            {/* =================================
                REPOSTS
            ================================== */}

            <TabsContent
              value="reposts"
              className="mt-5"
            >

              <div className="mb-4">

                <h3 className="text-base font-semibold">
                  Reposted By
                </h3>

                <p
                  className="
                    mt-1
                    text-xs
                    text-gray-500

                    dark:text-gray-400
                  "
                >
                  Users who reposted this post
                </p>

              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

                {repostUsers.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                  />
                ))}

              </div>

            </TabsContent>

          </Tabs>

        </div>

      </div>

    </div>
  )
}