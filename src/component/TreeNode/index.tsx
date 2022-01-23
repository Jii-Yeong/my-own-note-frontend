import { PAGES } from "$src/types/page";
import React from "react";
import styled from "styled-components";
import { IMAGE_URL } from '$config/proxy';
const Wrapper = styled.div`
  margin: 30px 0px 0px 25px;
  padding: 0;
`

const TreeList = styled.div`
  list-style: none;
  color: #ffffff;
  padding: 13px;
  cursor: pointer;
  &:hover {
    opacity: 0.5;
  }
`

const TriagleButton = styled.button<{ isOpen: boolean }>`
  height: 16px;
  margin: 13px 0px 0px 0px;
  background: url(${IMAGE_URL}/images/polygon.svg);
  background-size: contain;
  background-repeat: no-repeat;
  background-color: transparent;
  border: none;
  cursor: pointer;
  ${({ isOpen }) => isOpen && 'transform: rotate(90deg)'}
`

const TreeWrapper = styled.div`
  width: 150px;
  display: flex;
`

type Props = {
  pageList: Array<PAGES>;
  selectedPageList: Array<PAGES>;
  clickToggleDepths: (pageId: number) => void
  clickPageTitle: (pageId: number, title: string) => void
}

const TreeNode = ({ pageList, selectedPageList, clickToggleDepths, clickPageTitle }: Props) => {
  return (
    <Wrapper>
      {pageList.filter(page => !page.parentPageId).map((page, index) => {
        const isOpen = (pageId: number) => selectedPageList.filter(select => select.parentPageId === pageId).length !== 0;
        return (
          <TreeWrapper key={`${page.pageId}-${index}`}>
            <TriagleButton onClick={() => clickToggleDepths(page.pageId)} isOpen={isOpen(page.pageId)}/>
            <TreeList onClick={() => clickPageTitle(page.pageId, page.pageName)}>
              <div>{page.pageName}</div>
              {pageList.filter(pg => page.pageId === pg.parentPageId).map((pg, idx) => {
                if (pg.isSelected)
                return (
                  <TreeWrapper key={`${pg.pageId}-${idx}`}>
                    <TriagleButton onClick={() => clickToggleDepths(pg.pageId)} isOpen={isOpen(pg.pageId)}/>
                    <TreeList onClick={() => clickPageTitle(pg.pageId, pg.pageName)}>
                      <div>
                        {pg.pageName}
                      </div>
                      {pageList.filter(p => pg.pageId === p.parentPageId).map((p, i) => {
                        if (p.isSelected)
                        return (
                          <TreeWrapper key={`${p.pageId}-${i}`}>
                            <TriagleButton onClick={() => clickToggleDepths(p.pageId)} isOpen={isOpen(p.pageId)}/>
                            <TreeList onClick={() => clickPageTitle(p.pageId, p.pageName)}>
                              <div>{p.pageName}</div>
                            </TreeList>
                          </TreeWrapper>
                        )
                      })}
                    </TreeList>
                  </TreeWrapper>
                )
              })}
            </TreeList>
          </TreeWrapper>
        )
      })}
    </Wrapper>
  )
}

export default TreeNode;