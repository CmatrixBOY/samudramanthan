import { useRef, useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemText } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DescriptionIcon from '@mui/icons-material/Description';
import TableViewIcon from '@mui/icons-material/TableView';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { exportCSV, exportXLSX, exportPDF, exportDocx } from '../../utils/exporters.js';

export default function ExportMenu({ filename = 'export', rows = [], targetRef, docxTitle = 'Export' }) {
  const btnRef = useRef(null);
  const [anchor, setAnchor] = useState(null);

  const open = (e) => setAnchor(e.currentTarget);
  const close = () => setAnchor(null);

  return (
    <>
      <IconButton ref={btnRef} size="small" onClick={open} aria-label="export">
        <DownloadIcon fontSize="small" />
      </IconButton>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={close} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <MenuItem onClick={() => { exportCSV(filename, rows); close(); }}>
          <TableViewIcon fontSize="small" className="mr-2" /><ListItemText>CSV</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { exportXLSX(filename, rows); close(); }}>
          <DescriptionIcon fontSize="small" className="mr-2" /><ListItemText>Excel (.xlsx)</ListItemText>
        </MenuItem>
        <MenuItem onClick={async () => { if (targetRef?.current) await exportPDF(filename, targetRef.current); close(); }}>
          <PictureAsPdfIcon fontSize="small" className="mr-2" /><ListItemText>PDF</ListItemText>
        </MenuItem>
        <MenuItem onClick={async () => { await exportDocx(filename, docxTitle, rows.map(r=>JSON.stringify(r))); close(); }}>
          <InsertDriveFileIcon fontSize="small" className="mr-2" /><ListItemText>Word (.docx)</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
