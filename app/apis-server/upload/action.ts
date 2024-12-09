import * as clientUtils from "~/utils/client";
import type * as rrn from "@remix-run/node";

import {
  unstable_composeUploadHandlers as composeUploadHandlers,
  unstable_createFileUploadHandler as createFileUploadHandler,
  unstable_createMemoryUploadHandler as createMemoryUploadHandler,
  unstable_parseMultipartFormData as uparseMultipartFormData,
} from "@remix-run/node";
import { forkJoin, from, of, switchMap } from "rxjs";

import { joseJwt } from "@/libs/jose";
import { resp$ } from "@/utils/server";
import { storageService } from "~/services/admin/tools/StorageService";

export const createToolsStorage$ = async (args: rrn.LoaderFunctionArgs) => {
  const { request } = args;
  const payload = await joseJwt.getTokenUserIdByArgs(args);
  const userId = payload.userId;
  if (!userId) {
    return resp$(of(null));
  }

  const result$ = forkJoin({
    fileUploader: of(
      createFileUploadHandler({
        maxPartSize: 2 * 1024 * 1024,
        directory: "public/uploads",
        file: ({ filename }) => filename,
      }),
    ),
    memoryUploader: of(createMemoryUploadHandler()),
  })
    .pipe(
      switchMap((data) =>
        of(composeUploadHandlers(data.fileUploader, data.memoryUploader)),
      ),
      switchMap((uploadHandler) =>
        from(uparseMultipartFormData(request, uploadHandler)),
      ),
      switchMap((formData) => of(formData.get("file"))),
    )
    .pipe(
      switchMap((file: any) =>
        storageService.create({
          userId,
          name: file.name,
          fileName: file.name,
          extName: clientUtils.extname(file.name),
          path: "/uploads/" + file.name,
          size: file.size.toString(),
          type: file.type,
        }),
      ),
    );

  return resp$(result$);
};
