import GoldenbergRenderer from "@/dian/builtin/renderer/goldenberg/goldenberg_renderer";
import RendererDoc from "@/dian/components/RendererDocComponent";

const GoldenbergRenderDocPage: React.FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">GoldenBerg 渲染器文档</h1>
      {/* 上部留白，四周边距均匀，带圆角边框 */}
      <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg">
        <RendererDoc renderers={GoldenbergRenderer} />
      </div>
    </div>
  )
};

export default GoldenbergRenderDocPage;
