import { useState, useRef, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import axios from "axios";
import Loading from "./loading.gif"

function TreeCustom() {
    const _isMounted = useRef(false)
        , [arrTree, setArrTree] = useState()
        , [arrData, setArrData] = useState()
        , [arrExpandedKey, setArrExpandedKey] = useState()
        , onReload = async () => {
            if (_isMounted.current) {
                setArrExpandedKey([])
                setArrData(await loadTreeNode(null, 10))
            }
        }
        , [visable, setVisable] = useState(10)
        , loader = useRef(null)
        , [loading, setLoading] = useState(false)

    const isNotNullOrEmpty = (item) => {
        return item?.length > 0;
    }

    const GetTree = (params) => {
        return axios
            .get('https://nguoidungapicore.azurewebsites.net/api/v1/AdministrativeUnits/GetTree', {
                params,
                headers: {
                    ApiKey: "R/yYUbEgGxv/aH/LKGzeSw==",
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyTmFtZSI6InRlc3QiLCJGdWxsTmFtZSI6InRlc3QgdGVzdCIsIkVtYWlsIjoiZG9kdWNtaW5oMTUxMTE5OTlAZ21haWwuY29tIiwiUGhvbmUiOiIiLCJQaG90byI6Imh0dHBzOi8vcG9ydGFsdXBsb2FkLmF6dXJld2Vic2l0ZXMubmV0L1Jlc291cmNlcy9uYW0yMDIzL3RoYW5nMDIvbmdheTEwL2U1MzJjOGIzLTk2YmItNGNiNi04M2VkLWQwNGRkZjE0MjdkMi5qcGcsaHR0cHM6Ly9wb3J0YWx1cGxvYWQuYXp1cmV3ZWJzaXRlcy5uZXQvUmVzb3VyY2VzL25hbTIwMjMvdGhhbmcwMi9uZ2F5MTAvOGYwMzRiYzgtYjVlMi00Yzg4LWIyNjUtMDk1MGI2N2RhMjE5LmpwZyxodHRwczovL3BvcnRhbHVwbG9hZC5henVyZXdlYnNpdGVzLm5ldC9SZXNvdXJjZXMvbmFtMjAyMy90aGFuZzAyL25nYXkxMC8yZmJhYjE2Zi1mMjQ2LTRiZjMtOTUwMS1jZDc1MjY4MjgwMTkuanBnIiwiVXNlcklkIjoiOTc3YWZjMjgtZTI3NC00MGU2LWE4NDMtYTI1NTM3NTRjMWMzIiwianRpIjoiYjJhMjI5NGYtMzAwNi00NTFkLTg1MDktNDRkYzI3ZDRhY2QwIiwiVGltZUluIjoiMjAyMy0wMy0yMlQwMTo1Mjo1Ny44NjA0Nzk1KzAwOjAwIiwiRXhwaXJlcyI6IjIwMjMtMDMtMjZUMDU6NTI6NTcuODYwNDc5NSswMDowMCIsIlVuaXQiOiIiLCJVbml0cyI6IiIsIkRlcGFydG1lbnRzIjoiIiwiUG9zaXRpb25zIjoiIiwiV29ya2luZ0dyb3VwcyI6IiIsIlN1YnN0aXR1dGVzIjoiIiwiUHJpbyI6IiIsIm5iZiI6MTY3OTQ0OTk3NywiZXhwIjoxNjc5ODA5OTc3LCJpc3MiOiJwc2N0ZWxlY29tLmNvbS52biIsImF1ZCI6IlNlcnZpY2VDbGllbnQifQ.irIHo33WyGP4nRKD6vAMuQHglCRi_KBn_XXR3CfsO-U",
                }
            })
            .then((response) => {
                if (response.status === 200) {
                    setLoading(true)
                    console.log(response);
                    return response;
                }

                throw new Error(response.status);
            })
            .catch((err) => { debugger })
    }

    const loadTreeNode = async (id, treeDepth) => {
        const result = await GetTree({ id, treeDepth })

        if (result?.status === 200) {
            return result.data
        }
        return null
    }

    useEffect(() => {
        _isMounted.current = true
        const init = async () => setArrData(await loadTreeNode(null, 0))
        setLoading(true)
        init()

        return () => {
            _isMounted.current = false
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    useEffect(() => {
        if (_isMounted.current) {
            if (arrData?.length > 0) {
                const createTree = (listData) => !isNotNullOrEmpty(listData) ? []
                    : listData.slice(0, visable).map((data, index) => {
                        const isLoaded =
                            !data.IsParent ||
                            (data.IsParent && data.ArrAdministrativeUnit !== null);
                        return {
                            title: (

                                <div className={`title-tree-node  ${data.IsParent ? data.ParentId ? 'district' : 'city' : ''}`}>
                                    <label className="col-form-label overflow-y-auto">
                                        {data.ProvinceName}_{data.Idc}
                                    </label>
                                </div>
                            ),
                            _originValue: data,
                            _isApiLoaded: isLoaded,
                            children: isLoaded ? createTree(data.ArrAdministrativeUnit) : [{ key: "temp" + data.Id }],
                            key: data.Id,

                        }
                    });
                setArrTree(createTree(arrData))
                setLoading(true)
            } else {
                setArrTree([])
            }
        }
    }, [arrData, visable])

    useEffect(() => {
        console.log('loadtree');
        if (loading) {
            const observer = new IntersectionObserver(entries => {
                if (entries[0].isIntersecting) {
                    loadMore()
                }
            }, { threshold: 1 });
            observer.observe(loader.current)
        }

    }, [loading]);

    /**tree event when expand node */
    const onNodeExpand = async (expandedKeys, { node, expanded }) => {
        if (_isMounted.current) {
            const { _isApiLoaded, _originValue } = node
            setArrExpandedKey(expandedKeys)
            if (expanded && !_isApiLoaded) {
                let id = _originValue.Id
                const data = await loadTreeNode(id, 0)
                if (_isMounted.current)
                    if (isNotNullOrEmpty(data)) {
                        if (isNotNullOrEmpty(id)) {
                            const loop = (value, key = 0) => {
                                if (expandedKeys.includes(value.Id)) {
                                    value.ArrAdministrativeUnit = value.Id === id
                                        ? data
                                        : value.ArrAdministrativeUnit.map((x) => loop(x, key + 1))
                                }
                                return value;
                            }
                            setArrData(arrData.map(x => loop(x)))
                        } else {
                            setArrData(state => isNotNullOrEmpty(state)
                                ? [...new Map([...state, ...data].map((item) => [item.Idc, item])).values()]
                                : data
                            )
                        }
                    }
            }
        }
    }
        , loadMore = () => {
            setVisable(prev => prev + 10)
        }



    return (
        <>
            <div>
                <Tree
                    blockNode
                    expandedKeys={arrExpandedKey}
                    onExpand={onNodeExpand}
                    switcherIcon={<DownOutlined />}
                    className="draggable-tree"
                    treeData={arrTree}
                />

            </div>
           
            <button onClick={loadMore} ref={loader}>
                <div>
                    <img src={Loading} alt="" />
                </div>
            </button>

        </>
    )
}

export default TreeCustom;