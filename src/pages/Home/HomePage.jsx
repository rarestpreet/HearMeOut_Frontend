import { useNavigate } from "react-router-dom"
import FeedPost from "../../components/ui/FeedPost"
import { useUserContext } from "../../context/userContext"
import { useEffect, useState } from "react"
import apiCall from "../../services/apiCall"

function HomePage() {
  const navigate = useNavigate()
  const { setLoading } = useUserContext()
  const [feedData, setFeedData] = useState([])
  // const posts = useLoaderData().data
  useEffect(() => {
    const populateFeed = async () => {
      const response = await apiCall.getFeed(setLoading)
      setFeedData(response?.data || [])
    }
    populateFeed()
  }, [])

  return (
    <div className="flex flex-col gap-5 px-4 lg:mx-50">
      {feedData.map((currPost, index) => {
        return <FeedPost post={currPost} index={index} />
      })}
    </div>
  )
}

export default HomePage