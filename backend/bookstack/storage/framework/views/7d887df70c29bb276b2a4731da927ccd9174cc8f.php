<div id="markdown-editor" component="markdown-editor"
     option:markdown-editor:page-id="<?php echo e($model->id ?? 0); ?>"
     option:markdown-editor:text-direction="<?php echo e(config('app.rtl') ? 'rtl' : 'ltr'); ?>"
     option:markdown-editor:image-upload-error-text="<?php echo e(trans('errors.image_upload_error')); ?>"
     option:markdown-editor:server-upload-limit-text="<?php echo e(trans('errors.server_upload_limit')); ?>"
     class="flex-fill flex code-fill">

    <div class="markdown-editor-wrap active">
        <div class="editor-toolbar">
            <span class="float left editor-toolbar-label"><?php echo e(trans('entities.pages_md_editor')); ?></span>
            <div class="float right buttons">
                <?php if(config('services.drawio')): ?>
                    <button class="text-button" type="button" data-action="insertDrawing"><?php echo icon('drawing'); ?><?php echo e(trans('entities.pages_md_insert_drawing')); ?></button>
                    <span class="mx-xs text-muted">|</span>
                <?php endif; ?>
                <button class="text-button" type="button" data-action="insertImage"><?php echo icon('image'); ?><?php echo e(trans('entities.pages_md_insert_image')); ?></button>
                <span class="mx-xs text-muted">|</span>
                <button class="text-button" type="button" data-action="insertLink"><?php echo icon('link'); ?><?php echo e(trans('entities.pages_md_insert_link')); ?></button>
                <span class="mx-xs text-muted">|</span>
                <button class="text-button" type="button" data-action="fullscreen"><?php echo icon('fullscreen'); ?><?php echo e(trans('common.fullscreen')); ?></button>
            </div>
        </div>

        <div markdown-input class="flex flex-fill">
            <textarea id="markdown-editor-input"
                      <?php if($errors->has('markdown')): ?> class="text-neg" <?php endif; ?>
                      name="markdown"
                      rows="5"><?php if(isset($model) || old('markdown')): ?><?php echo e(old('markdown') ?? ($model->markdown === '' ? $model->html : $model->markdown)); ?><?php endif; ?></textarea>
        </div>

    </div>

    <div class="markdown-editor-wrap">
        <div class="editor-toolbar">
            <div class="editor-toolbar-label"><?php echo e(trans('entities.pages_md_preview')); ?></div>
        </div>
        <iframe src="about:blank" class="markdown-display" sandbox="allow-same-origin"></iframe>
    </div>
</div>



<?php if($errors->has('markdown')): ?>
    <div class="text-neg text-small"><?php echo e($errors->first('markdown')); ?></div>
<?php endif; ?><?php /**PATH /var/www/bookstack/resources/views/pages/parts/markdown-editor.blade.php ENDPATH**/ ?>