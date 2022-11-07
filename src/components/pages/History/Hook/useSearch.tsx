import { useEffect, useState } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useAppDispatch } from "store/hooks";
import { saveTransfer } from "store/Transfer/transferSlice";
import { getTransfers } from "store/Transfer/transferThunk";
import { IColumn } from "store/Transfer/transferInterface";
export default function useSearch(
  accountNumberSelector: string,
  pageNumber: string
) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [transfers, setTransfers] = useState<IColumn[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [end, setEnd] = useState(false);

  console.log("transfers :>> ", transfers);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(end ? false : true);
    setError(false);
    debounce(() => {
      if (end) return;
      dispatch(
        getTransfers({ bankAccountNumber: accountNumberSelector, pageNumber })
      )
        .then(({ payload }) => {
          setTransfers((prevBooks): IColumn[] => {
            return [...prevBooks, ...payload];
          });
          setEnd(payload.length === 0);
          setLoading(false);
          setHasMore(false);
      
        })
        .catch((e) => {
          if (axios.isCancel(e)) return;
          setError(true);
        });
      // dispatch(saveTransfer(transfers));
    }, 1000)();
  }, [pageNumber]);

  return { loading, error, transfers, hasMore, end };
}
