type TreeNode = {
  tag: string;
  children?: (TreeNode | string)[];
};

const serializeHTML = (tree: TreeNode): string => {
  let result = "";
  result += `<${tree.tag}>`;

  const helper = (children: (TreeNode | string)[]) => {
    for (const item of children) {
      if (typeof item === "string") {
        result += ` ${item}`;
      } else {
        result += `<${item.tag}>`;
        if (item.children && Array.isArray(item.children)) {
          helper(item.children);
        }
        result += `</${item.tag}>`;
      }
    }
  };

  if (tree.children && Array.isArray(tree.children)) {
    helper(tree.children);
  }

  result += `</${tree.tag}>`;
  console.log(result);
  return result;
};

// Example usage
const tree: TreeNode = {
  tag: "body",
  children: [
    { tag: "div", children: [{ tag: "span", children: ["foo", "bar"] }] },
    { tag: "div", children: ["baz"] },
  ],
};

serializeHTML(tree);
