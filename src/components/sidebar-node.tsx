export function SidebarNode({ node }: { node: Node }) {
  return (
    <>
      <div>
        {node.isFolder ? "📁" : "📄"} {node.name}
      </div>
      {node.isFolder &&
        node.children.map((child) => <SidebarNode node={child} />)}
    </>
  );
}
