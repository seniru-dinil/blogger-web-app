"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ArticleData from "@/model/articleData.model";
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  extractClosestEdge,
  attachClosestEdge,
  Edge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { getReorderDestinationIndex } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/get-reorder-destination-index";
import { reorder } from "@atlaskit/pragmatic-drag-and-drop/reorder";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { Grip, GripVertical, Pencil } from "lucide-react";

interface ArticleDataListProps {
  articleDataList: ArticleData[];
}

type DraggableArticleData = ArticleData & { index: number };

export default function ArticleDataList({
  articleDataList,
}: ArticleDataListProps) {
  const [articles, setArticles] = useState(articleDataList);
  const [instanceId] = useState(() => Symbol("article-list"));

  const reorderArticles = useCallback(
    ({
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
    }: {
      startIndex: number;
      indexOfTarget: number;
      closestEdgeOfTarget: Edge | null;
    }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: "vertical",
      });

      if (finishIndex === startIndex) return;

      setArticles((prev) =>
        reorder({
          list: prev,
          startIndex,
          finishIndex,
        })
      );
    },
    []
  );

  useEffect(() => {
    return monitorForElements({
      canMonitor: ({ source }) =>
        source.data?.type === "article" &&
        source.data.instanceId === instanceId,
      onDrop: ({ location, source }) => {
        const target = location.current.dropTargets[0];
        if (!target) return;

        const sourceData = source.data;
        const targetData = target.data;
        if (!sourceData || !targetData || sourceData.id === targetData.id)
          return;

        const indexOfTarget = articles.findIndex((a) => a.id === targetData.id);
        if (indexOfTarget === -1) return;

        const closestEdgeOfTarget = extractClosestEdge(targetData);
        reorderArticles({
          startIndex:
            typeof sourceData.index === "number" ? sourceData.index : 0,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [articles, reorderArticles, instanceId]);

  return (
    <div className="grid gap-3">
      {articles.map((data, index) => (
        <div className="flex justify-between items-center">
          <DraggableArticle
            key={data.id}
            data={{ ...data, index }}
            instanceId={instanceId}
          />
        </div>
      ))}
    </div>
  );
}
function DraggableArticle({
  data,
  instanceId,
}: {
  data: DraggableArticleData;
  instanceId: symbol;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = containerRef.current;
    const handle = handleRef.current;
    if (!element || !handle) return;

    const cleanup = combine(
      draggable({
        element,
        getInitialData: () => ({
          type: "article",
          id: data.id,
          index: data.index,
          instanceId,
        }),
      }),
      dropTargetForElements({
        element,
        canDrop: ({ source }) => source.data?.instanceId === instanceId,
        getData: ({ input }) =>
          attachClosestEdge(
            {
              type: "article",
              id: data.id,
              instanceId,
            },
            {
              element,
              input,
              allowedEdges: ["top", "bottom"],
            }
          ),
      })
    );

    return () => cleanup();
  }, [data.id, data.index, instanceId]);

  return (
    <div
      ref={containerRef}
      className="bg-sky-200/20 border border-sky-200 px-3 py-3 rounded-sm w-full transition-shadow hover:shadow flex gap-3 justify-between items-center"
    >
      <div className="flex items-center gap-3">
        {/* This is the draggable handle */}
        <div ref={handleRef} className="cursor-grab">
          <GripVertical size={22} className="text-sky-800" />
        </div>
        <h3 className="text-sky-800 font-semibold text-sm uppercase">
          {data.title}
        </h3>
      </div>
      <div className="flex items-center gap-3">
        <p className="bg-sky-700 text-white rounded-full text-xs font-bold px-3 py-1">
          Drafted
        </p>
        <Pencil size={14} className="text-sky-800" />
      </div>
    </div>
  );
}
