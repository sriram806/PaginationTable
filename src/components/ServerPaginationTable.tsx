import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import axios from 'axios';

interface Artwork {
  id: number;
  title: string;
  place_of_origin?: string;
  artist_display?: string;
  inscriptions?: string;
  date_start?: string;
  date_end?: string;
}

export default function ArtworksServerPagination() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [page, setPage] = useState(0);
  const rowsPerPage = 10;

  const fetchArtworks = async (pageNumber: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://api.artic.edu/api/v1/artworks?page=${pageNumber + 1}&limit=${rowsPerPage}`);
      setArtworks(response.data.data);
      setTotalRecords(response.data.pagination.total);
    } catch (error) {
      console.error('Error fetching artworks:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArtworks(page);
  }, [page]);

  const onPageChange = (e: any) => {
    setPage(e.page);
  };

  const placeOfOriginBodyTemplate = (rowData: Artwork) => rowData?.place_of_origin || 'NULL';
  const artistBodyTemplate = (rowData: Artwork) => rowData?.artist_display || 'NULL';
  const inscriptionsBodyTemplate = (rowData: Artwork) => rowData?.inscriptions || 'NULL';
  const dateStartBodyTemplate = (rowData: Artwork) => rowData?.date_start || 'NULL';
  const dateEndBodyTemplate = (rowData: Artwork) => rowData?.date_end || 'NULL';

  return (
    <>
      <div className="p-mb-4">
        <h1 className="p-text-center">List of Famous European Artists and Their Notable Paintings and Sculptures</h1>
      </div>
      <div className="card">
        <DataTable
          value={artworks}
          paginator
          rows={rowsPerPage}
          totalRecords={totalRecords}
          lazy
          first={page * rowsPerPage}
          onPage={onPageChange}
          loading={loading}
          dataKey="id"
          selectionMode="checkbox"
          selection={selectedArtworks}
          onSelectionChange={(e) => setSelectedArtworks(e.value)}
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
          <Column field="title" header="Title" sortable filter filterPlaceholder="Search by title" style={{ minWidth: '14rem' }} />
          <Column
            field="place_of_origin"
            header="Place of Origin"
            sortable
            filter
            filterPlaceholder="Search by place of origin"
            style={{ minWidth: '14rem' }}
            body={placeOfOriginBodyTemplate}
          />
          <Column
            field="artist_display"
            header="Artist"
            sortable
            filter
            filterPlaceholder="Search by artist"
            style={{ minWidth: '14rem' }}
            body={artistBodyTemplate}
          />
          <Column
            field="inscriptions"
            header="Inscriptions"
            sortable
            filter
            filterPlaceholder="Search by inscriptions"
            style={{ minWidth: '14rem' }}
            body={inscriptionsBodyTemplate}
          />
          <Column
            field="date_start"
            header="Start Date"
            sortable
            filter
            filterPlaceholder="Search by start date"
            style={{ minWidth: '12rem' }}
            body={dateStartBodyTemplate}
          />
          <Column
            field="date_end"
            header="End Date"
            sortable
            filter
            filterPlaceholder="Search by end date"
            style={{ minWidth: '12rem' }}
            body={dateEndBodyTemplate}
          />
        </DataTable>
      </div>
    </>
  );
}
