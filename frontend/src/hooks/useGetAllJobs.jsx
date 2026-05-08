import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = (keywordOverride) => {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector((store) => store.job);
  const keyword =
    keywordOverride !== undefined ? keywordOverride : searchedQuery;
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const res = await axios.get(
          `${JOB_API_END_POINT}/get?keyword=${keyword}`,
          { withCredentials: true },
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (error) {
        // Handle error silently
      }
    };
    fetchAllJobs();
  }, [keyword, dispatch]);
};

export default useGetAllJobs;
