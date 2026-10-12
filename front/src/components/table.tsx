function Table({ children }: { children: React.ReactNode }) {
  return (
    <table className="w-full max-w-4xl mx-auto border border-gray-300">
      {children}
    </table>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return <thead>{children}</thead>;
}

function HeaderCell({ children }: { children: React.ReactNode }) {
  return <th className="border border-gray-300 p-2 text-left">{children}</th>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

function Row({
  children,
  key,
}: {
  children: React.ReactNode;
  key?: React.Key;
}) {
  return <tr key={key}>{children}</tr>;
}

function Cell({ children }: { children: React.ReactNode }) {
  return <td className="border border-gray-300 p-2">{children}</td>;
}

Table.Head = Header;
Table.Body = Body;
Table.Row = Row;
Table.HeaderCell = HeaderCell;
Table.Cell = Cell;

export default Table;
