import { useState } from 'react'

import { getFolders, getLinksByFolderID } from '../../api'
import FolderList from '../FolderList/FolderList'
import CardList from '../../components/CardList/CardList'
import useAsync from '../../Hooks/useAsync';
import { flexCenter } from '../../style/common'
import styled from 'styled-components'

const NoLinkFrame = styled.div`
  width: 1060px;
  height: 100px;
  padding: 41px 0px 35px 0px;
  ${flexCenter}
`;

function NoLink() {
  return <NoLinkFrame>저장된 링크가 없습니다.</NoLinkFrame>;
}


function FolderAndLink() {
  const [selectedFolderId, setSelectedFolderId] = useState(undefined)
  const DEFAULT_FOLDER = 1
  // 폴더
  const [folderData, isLoadingFolder, folderError, getFolderAsync] = useAsync(
    () => getFolders(DEFAULT_FOLDER)
  )

  const [linkData, isLoadinglink, linkError, getLinkAsync] = useAsync(
    () => getLinksByFolderID(DEFAULT_FOLDER, selectedFolderId),
    [selectedFolderId]
  )

  if (!folderData) return null
  // if (isLoadingFolder) return <div>로딩 중입니다.</div>
  // if (folderError) return <div>에러가 발생했습니다.</div>

  if (!linkData) return null
  // if (isLoadinglink) return <div>로딩 중입니다.</div>
  // if (linkError) return <div>에러가 발생했습니다.</div>

  const folders = folderData?.data
  const links = linkData?.data

  // 링크

  const setFolderLink = (folder_id) => {
    setSelectedFolderId(folder_id)
    getLinkAsync(DEFAULT_FOLDER, selectedFolderId)
  }

  return (
    <>
      {folders.length !== 0 && (
        <FolderList
          folders={folders}
          setFolderLink={setFolderLink}
          selectedFolderId={selectedFolderId}
        />
      )}
      {links.length === 0 ? <NoLink /> : <CardList links={links} />}
    </>
  )
}

export default FolderAndLink
