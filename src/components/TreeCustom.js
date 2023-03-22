import { useState, useRef, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import axios from "axios";
function isNotNullOrEmpty(item) {
  return item?.length > 0;
}

const GetTree = (params) => {
  return axios
    .get(
      "https://nguoidungapicore.azurewebsites.net/api/v1/AdministrativeUnits/GetTree",
      {
        params,
        headers: {
          ApiKey: "R/yYUbEgGxv/aH/LKGzeSw==",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6InRlc3QiLCJGdWxsTmFtZSI6InRlc3QgdGVzdCIsIkVtYWlsIjoiZG9kdWNtaW5oMTUxMTE5OTlAZ21haWwuY29tIiwiUGhvbmUiOiIiLCJQaG90byI6Imh0dHBzOi8vcG9ydGFsdXBsb2FkLmF6dXJld2Vic2l0ZXMubmV0L1Jlc291cmNlcy9uYW0yMDIzL3RoYW5nMDIvbmdheTEwL2U1MzJjOGIzLTk2YmItNGNiNi04M2VkLWQwNGRkZjE0MjdkMi5qcGcsaHR0cHM6Ly9wb3J0YWx1cGxvYWQuYXp1cmV3ZWJzaXRlcy5uZXQvUmVzb3VyY2VzL25hbTIwMjMvdGhhbmcwMi9uZ2F5MTAvOGYwMzRiYzgtYjVlMi00Yzg4LWIyNjUtMDk1MGI2N2RhMjE5LmpwZyxodHRwczovL3BvcnRhbHVwbG9hZC5henVyZXdlYnNpdGVzLm5ldC9SZXNvdXJjZXMvbmFtMjAyMy90aGFuZzAyL25nYXkxMC8yZmJhYjE2Zi1mMjQ2LTRiZjMtOTUwMS1jZDc1MjY4MjgwMTkuanBnIiwiVXNlcklkIjoiOTc3YWZjMjgtZTI3NC00MGU2LWE4NDMtYTI1NTM3NTRjMWMzIiwianRpIjoiYjJhMjI5NGYtMzAwNi00NTFkLTg1MDktNDRkYzI3ZDRhY2QwIiwiVGltZUluIjoiMjAyMy0wMy0yMlQwMTo1Mjo1Ny44NjA0Nzk1KzAwOjAwIiwiRXhwaXJlcyI6IjIwMjMtMDMtMjZUMDU6NTI6NTcuODYwNDc5NSswMDowMCIsIlVuaXQiOiIiLCJVbml0cyI6IiIsIkRlcGFydG1lbnRzIjoiIiwiUG9zaXRpb25zIjoiIiwiV29ya2luZ0dyb3VwcyI6IiIsIlN1YnN0aXR1dGVzIjoiIiwiUHJpbyI6IiIsIm5iZiI6MTY3OTQ0OTk3NywiZXhwIjoxNjc5ODA5OTc3LCJpc3MiOiJwc2N0ZWxlY29tLmNvbS52biIsImF1ZCI6IlNlcnZpY2VDbGllbnQifQ.irIHo33WyGP4nRKD6vAMuQHglCRi_KBn_XXR3CfsO-U",
        },
      }
    )
    .then((response) => {
      if (response.status === 200) return response;

      throw new Error(response.status);
    })
    .catch((err) => {
      debugger;
    });
};

const loadTreeNode = async (id, treeDepth) => {
  const result = await GetTree({ id, treeDepth });
  if (result?.status === 200) {
    return result.data;
  }
  return null;
};

const createTree = (listData) =>
  !isNotNullOrEmpty(listData)
    ? []
    : listData.map((data, index) => {
        const isLoaded =
          !data.IsParent ||
          (data.IsParent && data.ArrAdministrativeUnit !== null);
        return {
          title: (
            <div
              className={`title-tree-node ${
                data.IsParent ? (data.ParentId ? "district" : "city") : ""
              } `}
            >
              <label className="col-form-label">
                {data.Name}_{data.Idc}
              </label>
            </div>
          ),
          _originValue: data,
          _isApiLoaded: isLoaded,
          children: isLoaded
            ? createTree(data.ArrAdministrativeUnit)
            : [{ key: "temp" + data.Id }],
          key: data.Id,
        };
      });

function TreeCustom() {
  const _isMounted = useRef(false),
    [data, setData] = useState([]),
    [arrTree, setArrTree] = useState([]),
    [arrData, setArrData] = useState([]),
    [arrExpandedKey, setArrExpandedKey] = useState(),
    [index, setIndex] = useState(0),
    [loading, setLoading] = useState(false),
    rowPerPage = 30,
    onReload = async () => {
      if (_isMounted.current) {
        setArrExpandedKey([]);
        setArrData(await loadTreeNode(null, 0));
      }
    };

  useEffect(() => {
    _isMounted.current = true;
    const init = async () => setArrData(await loadTreeNode(null, 0));
    init();
    return () => {
      _isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (_isMounted.current) {
      if (arrData?.length > 0) {
        setArrTree(createTree(arrData));
        // setArrTree([
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        //   {
        //     title: "abc",
        //     children: [{ title: "xyz", key: "temp" + data.Id }],
        //     key: data.Id,
        //   },
        // ]);
      } else setArrTree([]);
    }
  }, [arrData]);

  useEffect(() => {
    const newData = arrTree.slice(index, index + rowPerPage);
    setData([...data, ...newData]);
  }, [index, arrTree]);
  // const newData = arrTree.slice(index, index + rowPerPage);
  // const data = newData.reduce((a, b) => a.concat(b), []);
  /**tree event when expand node */
  const onNodeExpand = async (expandedKeys, { node, expanded }) => {
    if (_isMounted.current) {
      const { _isApiLoaded, _originValue } = node;
      setArrExpandedKey(expandedKeys);
      if (expanded && !_isApiLoaded) {
        let id = _originValue.Id;
        const data = await loadTreeNode(id, 0);
        if (_isMounted.current)
          if (isNotNullOrEmpty(data)) {
            if (isNotNullOrEmpty(id)) {
              const loop = (value, key = 0) => {
                if (expandedKeys.includes(value.Id)) {
                  value.ArrAdministrativeUnit =
                    value.Id === id
                      ? data
                      : value.ArrAdministrativeUnit.map((x) =>
                          loop(x, key + 1)
                        );
                }
                return value;
              };
              setArrData(arrData.map((x) => loop(x)));
            } else {
              setArrData((state) =>
                isNotNullOrEmpty(state)
                  ? [
                      ...new Map(
                        [...state, ...data].map((item) => [item.Idc, item])
                      ).values(),
                    ]
                  : data
              );
            }
          }
      }
    }
  };

  const handleScroll = (event) => {
    // const percent =
    //   document.documentElement.scrollTop -
    //   (document.documentElement.scrollHeight -
    //     document.documentElement.clientHeight);

    // if (Math.floor(percent) === 0) {
    //   setLoading(true);
    //   console.log(percent);
    //   console.log("keo het r ");
    // }
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      if (data.length < arrTree.length) {
        console.log("toi cuoi r");
        setLoading(true);
      }
    }
  };

  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIndex((pre) => pre + rowPerPage);
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [loading]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });
  console.log(data);
  return (
    <div>
      <Tree
        blockNode
        expandedKeys={arrExpandedKey}
        onExpand={onNodeExpand}
        switcherIcon={<DownOutlined />}
        className="draggable-tree"
        treeData={data}
      />
      {loading ? (
        <button
          disabled
          type="button"
          className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg inline-flex items-center"
        >
          <svg
            ariaHidden="true"
            role="status"
            className="inline w-4 h-4 mr-3 text-gray-200 animate-spin "
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="#1C64F2"
            />
          </svg>
          Loading...
        </button>
      ) : (
        <div className="w-4 h-4"></div>
      )}
    </div>
  );
}

export default TreeCustom;
