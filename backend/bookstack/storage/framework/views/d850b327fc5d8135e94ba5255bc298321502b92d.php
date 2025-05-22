<div style="display: block;" toolbox-tab-content="files"
     component="attachments"
     option:attachments:page-id="<?php echo e($page->id ?? 0); ?>">

    <h4><?php echo e(trans('entities.attachments')); ?></h4>
    <div class="px-l files">

        <div refs="attachments@listContainer">
            <p class="text-muted small"><?php echo e(trans('entities.attachments_explain')); ?> <span class="text-warn"><?php echo e(trans('entities.attachments_explain_instant_save')); ?></span></p>

            <div component="tabs" refs="attachments@mainTabs" class="tab-container">
                <div class="nav-tabs">
                    <button refs="tabs@toggleItems" type="button" class="selected tab-item"><?php echo e(trans('entities.attachments_items')); ?></button>
                    <button refs="tabs@toggleUpload" type="button" class="tab-item"><?php echo e(trans('entities.attachments_upload')); ?></button>
                    <button refs="tabs@toggleLinks" type="button" class="tab-item"><?php echo e(trans('entities.attachments_link')); ?></button>
                </div>
                <div refs="tabs@contentItems attachments@list">
                    <?php echo $__env->make('attachments.manager-list', ['attachments' => $page->attachments->all()], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                </div>
                <div refs="tabs@contentUpload" class="hidden">
                    <?php echo $__env->make('form.dropzone', [
                        'placeholder' => trans('entities.attachments_dropzone'),
                        'url' =>  url('/attachments/upload?uploaded_to=' . $page->id),
                        'successMessage' => trans('entities.attachments_file_uploaded'),
                    ], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                </div>
                <div refs="tabs@contentLinks" class="hidden link-form-container">
                    <?php echo $__env->make('attachments.manager-link-form', ['pageId' => $page->id], \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?>
                </div>
            </div>

        </div>

        <div refs="attachments@editContainer" class="hidden attachment-edit-container">

        </div>

    </div>
</div><?php /**PATH /var/www/bookstack/resources/views/attachments/manager.blade.php ENDPATH**/ ?>